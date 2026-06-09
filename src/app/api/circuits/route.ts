import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import CircuitModel from '@/lib/models/Circuit'

export async function GET() {
  try {
    await connectDB()
    const circuits = await CircuitModel.find().sort({ name: 1 }).lean()
    return NextResponse.json({ success: true, data: circuits })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch circuits' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const circuit = new CircuitModel(body)
    await circuit.save()
    return NextResponse.json(
      { success: true, data: circuit, message: 'Circuit created' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create circuit' },
      { status: 500 }
    )
  }
}
