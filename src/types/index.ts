export interface Temple {
  _id?: string
  name: string
  deity: string
  state: string
  city: string
  address?: string
  history: string
  significance: string
  timing: string
  dressCode: string
  entryFee?: string
  festivals: string[]
  rituals: string[]
  facilities: string[]
  tags: string[]
  emoji: string
  imageUrl?: string
  featured: boolean
  famous: number // 1-5 rating
  coordinates?: { lat: number; lng: number }
  status: 'published' | 'draft' | 'pending'
  createdAt?: Date
  updatedAt?: Date
}

export interface PilgrimageCircuit {
  _id?: string
  name: string
  emoji: string
  description: string
  region: string
  stops: string[]
  duration?: string
  difficulty?: 'easy' | 'moderate' | 'challenging'
  bestSeason?: string
}

export interface SearchFilters {
  query?: string
  state?: string
  deity?: string
  tag?: string
  featured?: boolean
  page?: number
  limit?: number
  sort?: 'name' | 'state' | 'famous'
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  total?: number
  page?: number
  totalPages?: number
}
