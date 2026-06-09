import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import TempleModel from '@/lib/models/Temple'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const temple = await TempleModel.findById(params.id).lean()

    if (!temple) {
      return NextResponse.json(
        { success: false, message: 'Temple not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: temple })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch temple' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await req.json()

    const temple = await TempleModel.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean()

    if (!temple) {
      return NextResponse.json(
        { success: false, message: 'Temple not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: temple,
      message: 'Temple updated successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update temple' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const temple = await TempleModel.findByIdAndDelete(params.id)

    if (!temple) {
      return NextResponse.json(
        { success: false, message: 'Temple not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Temple deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete temple' },
      { status: 500 }
    )
  }
}
