import mongoose, { Schema, Document, Model } from 'mongoose'
import type { PilgrimageCircuit } from '@/types'

export interface CircuitDocument extends Omit<PilgrimageCircuit, '_id'>, Document {}

const CircuitSchema = new Schema<CircuitDocument>(
  {
    name: { type: String, required: true, trim: true },
    emoji: { type: String, default: '🚶' },
    description: { type: String, required: true },
    region: { type: String, required: true },
    stops: [{ type: String }],
    duration: { type: String },
    difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'moderate' },
    bestSeason: { type: String },
  },
  { timestamps: true }
)

const CircuitModel: Model<CircuitDocument> =
  mongoose.models.Circuit || mongoose.model<CircuitDocument>('Circuit', CircuitSchema)

export default CircuitModel
