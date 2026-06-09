import mongoose, { Schema, Document, Model } from 'mongoose'
import type { Temple } from '@/types'

export interface TempleDocument extends Omit<Temple, '_id'>, Document {}

const TempleSchema = new Schema<TempleDocument>(
  {
    name: { type: String, required: true, trim: true, index: true },
    deity: { type: String, required: true, trim: true, index: true },
    state: { type: String, required: true, trim: true, index: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    history: { type: String, required: true },
    significance: { type: String, default: '' },
    timing: { type: String, required: true },
    dressCode: { type: String, required: true },
    entryFee: { type: String, default: 'Free' },
    festivals: [{ type: String }],
    rituals: [{ type: String }],
    facilities: [{ type: String }],
    tags: [{ type: String, index: true }],
    emoji: { type: String, default: '🛕' },
    imageUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    famous: { type: Number, default: 3, min: 1, max: 5 },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'pending'],
      default: 'published',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Full-text search index
TempleSchema.index({ name: 'text', deity: 'text', city: 'text', history: 'text', tags: 'text' })

const TempleModel: Model<TempleDocument> =
  mongoose.models.Temple || mongoose.model<TempleDocument>('Temple', TempleSchema)

export default TempleModel
