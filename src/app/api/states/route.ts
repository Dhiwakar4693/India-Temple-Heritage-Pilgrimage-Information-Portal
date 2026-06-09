import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import TempleModel from '@/lib/models/Temple'

export async function GET() {
  try {
    await connectDB()

    const states = await TempleModel.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$state', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { state: '$_id', count: 1, _id: 0 } },
    ])

    return NextResponse.json({ success: true, data: states })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch states' },
      { status: 500 }
    )
  }
}
