import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import type { SortOrder } from 'mongoose'
import TempleModel from '@/lib/models/Temple'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query') || ''
    const state = searchParams.get('state') || ''
    const deity = searchParams.get('deity') || ''
    const tag = searchParams.get('tag') || ''
    const featured = searchParams.get('featured')
    const status = searchParams.get('status') || 'published'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sort = searchParams.get('sort') || 'name'

    // Build filter object
    const filter: Record<string, unknown> = { status }
    if (state) filter.state = state
    if (deity) filter.deity = new RegExp(deity, 'i')
    if (tag) filter.tags = { $in: [tag] }
    if (featured === 'true') filter.featured = true

    let dbQuery
    if (query) {
      dbQuery = TempleModel.find(
        { ...filter, $text: { $search: query } },
        { score: { $meta: 'textScore' } }
      )
    } else {
      dbQuery = TempleModel.find(filter)
    }

    // Sorting
    const sortMap: Record<string, Record<string, SortOrder>> = {
  name:   { name: 1 },
  state:  { state: 1, name: 1 },
  famous: { famous: -1, name: 1 },
  newest: { createdAt: -1 },
}

const sortOption = sortMap[sort] ?? { name: 1 as SortOrder }
dbQuery = dbQuery.sort(sortOption)

    const total = await TempleModel.countDocuments(filter)
    const temples = await dbQuery
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      data: temples,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/temples error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch temples' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    // Basic validation
    const required = ['name', 'deity', 'state', 'city', 'history', 'timing', 'dressCode']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const temple = new TempleModel({
      ...body,
      status: body.status || 'pending',
    })

    await temple.save()

    return NextResponse.json(
      { success: true, data: temple, message: 'Temple created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/temples error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create temple' },
      { status: 500 }
    )
  }
}
