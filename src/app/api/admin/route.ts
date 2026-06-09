import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import TempleModel from '@/lib/models/Temple'
import CircuitModel from '@/lib/models/Circuit'

export async function GET() {
  try {
    await connectDB()

    const [
      totalTemples,
      publishedTemples,
      pendingTemples,
      draftTemples,
      featuredTemples,
      totalCircuits,
      stateStats,
      deityStats,
    ] = await Promise.all([
      TempleModel.countDocuments(),
      TempleModel.countDocuments({ status: 'published' }),
      TempleModel.countDocuments({ status: 'pending' }),
      TempleModel.countDocuments({ status: 'draft' }),
      TempleModel.countDocuments({ featured: true }),
      CircuitModel.countDocuments(),
      TempleModel.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$state', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      TempleModel.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$deity', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ])

    return NextResponse.json({
      success: true,
      data: {
        temples: {
          total: totalTemples,
          published: publishedTemples,
          pending: pendingTemples,
          draft: draftTemples,
          featured: featuredTemples,
        },
        circuits: totalCircuits,
        topStates: stateStats.map((s) => ({ state: s._id, count: s.count })),
        topDeities: deityStats.map((d) => ({ deity: d._id, count: d.count })),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch admin stats' },
      { status: 500 }
    )
  }
}
