'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TEMPLES = [
  { id: 1, name: "Brihadeeswarar Temple", deity: "Lord Shiva", state: "Tamil Nadu", city: "Thanjavur", timing: "6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM", emoji: "🛕", history: "Built by Raja Raja Chola I around 1010 CE, a UNESCO World Heritage Site. The vimana stands 66 metres tall and casts no shadow at noon.", festivals: ["Maha Shivaratri", "Thiruvadhirai", "Karthigai Deepam"], dressCode: "Traditional attire preferred. Men remove shirts inside sanctum.", facilities: ["Choultry", "Guesthouses", "Local transport", "Food stalls"], tags: ["UNESCO", "Dravidian", "Chola"], featured: true, famous: 5 },
  { id: 2, name: "Meenakshi Amman Temple", deity: "Goddess Meenakshi", state: "Tamil Nadu", city: "Madurai", timing: "5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM", emoji: "🏛️", history: "Historic Hindu temple with 14 gopurams adorned with thousands of colorful sculptures, built during the Nayak period (1623–55 CE).", festivals: ["Meenakshi Thirukalyanam", "Chithirai Festival", "Float Festival"], dressCode: "Modest clothing required. No shorts or sleeveless.", facilities: ["Parking", "Cloakroom", "Nearby hotels"], tags: ["Shakti Peetha", "Famous", "Dravidian"], featured: true, famous: 5 },
  { id: 3, name: "Kashi Vishwanath Temple", deity: "Lord Shiva", state: "Uttar Pradesh", city: "Varanasi", timing: "3:00 AM – 11:00 PM", emoji: "⛩️", history: "One of the twelve Jyotirlingas on the western bank of the Ganges. The current structure was built by Ahilya Bai Holkar in 1780.", festivals: ["Maha Shivaratri", "Dev Deepawali", "Shravan Somvar"], dressCode: "Clean and modest traditional attire.", facilities: ["Ghats nearby", "Dharamshala", "Boat rides"], tags: ["Jyotirlinga", "Char Dham", "Sacred"], featured: true, famous: 5 },
  { id: 4, name: "Tirupati Venkateswara Temple", deity: "Lord Vishnu", state: "Andhra Pradesh", city: "Tirupati", timing: "2:30 AM – 1:00 AM", emoji: "🌟", history: "One of the richest and most visited religious sites in the world, receiving 50,000–100,000 pilgrims daily on the Tirumala hills.", festivals: ["Brahmotsavam", "Vaikunta Ekadasi", "Rathasapthami"], dressCode: "Traditional Indian attire mandatory.", facilities: ["TTD choultries", "Prasadam counters", "Online booking"], tags: ["Vaishnava", "Famous", "Tirumala"], featured: true, famous: 5 },
  { id: 5, name: "Somnath Temple", deity: "Lord Shiva", state: "Gujarat", city: "Veraval", timing: "6:00 AM – 9:30 PM", emoji: "🌊", history: "First of the twelve Jyotirlingas on Gujarat's western coast. Current structure inaugurated by Sardar Patel in 1951.", festivals: ["Maha Shivaratri", "Kartik Purnima"], dressCode: "Traditional and modest attire.", facilities: ["Trust guesthouses", "Sea view promenade", "Museum"], tags: ["Jyotirlinga", "Coastal", "Heritage"], featured: false, famous: 4 },
  { id: 6, name: "Kedarnath Temple", deity: "Lord Shiva", state: "Uttarakhand", city: "Kedarnath", timing: "6:00 AM – 3:00 PM, 5:00 PM – 9:00 PM", emoji: "🏔️", history: "Jyotirlinga at 3,583m in the Himalayas. Built by the Pandavas and revived by Adi Shankaracharya.", festivals: ["Char Dham Yatra", "Maha Shivaratri"], dressCode: "Warm clothing essential.", facilities: ["Helicopter service", "GMVN guesthouses", "Medical facilities"], tags: ["Jyotirlinga", "Char Dham", "Himalayan"], featured: false, famous: 4 },
  { id: 7, name: "Jagannath Temple", deity: "Lord Jagannath", state: "Odisha", city: "Puri", timing: "5:00 AM – 12:00 PM, 4:00 PM – 11:00 PM", emoji: "🎪", history: "12th-century Char Dham temple famous for the annual Rath Yatra, built by King Anantaganabhima.", festivals: ["Rath Yatra", "Snana Yatra", "Chandan Yatra"], dressCode: "Only Hindus allowed. No leather items.", facilities: ["Pilgrim accommodation", "Mahaprasad stalls"], tags: ["Char Dham", "Vaishnava", "Rath Yatra"], featured: false, famous: 5 },
  { id: 8, name: "Golden Temple", deity: "Guru Granth Sahib", state: "Punjab", city: "Amritsar", timing: "Open 24 hours", emoji: "✨", history: "Built in 1604 by Guru Arjan Dev Ji, covered in gold leaf. Welcomes all religions with free langar round the clock.", festivals: ["Baisakhi", "Guru Nanak Jayanti", "Gurpurab"], dressCode: "Head covered. Remove shoes. Modest clothing.", facilities: ["Free langar 24hrs", "Sarovar bathing", "Guesthouses", "Museum"], tags: ["Sikh Heritage", "Open 24hr"], featured: true, famous: 5 },
  { id: 9, name: "Rameshwaram Temple", deity: "Lord Shiva", state: "Tamil Nadu", city: "Rameswaram", timing: "5:00 AM – 1:00 PM, 3:00 PM – 9:00 PM", emoji: "🌺", history: "Jyotirlinga and Char Dham with India's longest corridor (1220m) and 22 teerthas. Associated with the Ramayana.", festivals: ["Maha Shivaratri", "Brahmotsavam"], dressCode: "Men remove shirts inside. Wet clothes allowed.", facilities: ["Dharamshala", "Teertham facilities", "Sea beach"], tags: ["Jyotirlinga", "Char Dham", "Coastal"], featured: false, famous: 4 },
  { id: 10, name: "Vaishno Devi Temple", deity: "Goddess Vaishno Devi", state: "Jammu & Kashmir", city: "Katra", timing: "Open 24 hours", emoji: "⛰️", history: "Cave shrine in the Trikuta Mountains housing three natural pindis. Receives 8–10 million pilgrims annually.", festivals: ["Navratri", "Diwali", "Ashtami"], dressCode: "Modest clothing. No footwear inside cave.", facilities: ["SMVDSB facilities", "Battery cars", "Helicopters"], tags: ["Shakti Peetha", "Famous", "Cave Shrine"], featured: false, famous: 5 },
  { id: 11, name: "Sun Temple Konark", deity: "Surya (Sun God)", state: "Odisha", city: "Konark", timing: "6:00 AM – 8:00 PM", emoji: "☀️", history: "13th-century UNESCO World Heritage chariot-shaped temple by King Narasimhadeva I with intricate sculptures.", festivals: ["Konark Dance Festival", "Magha Saptami"], dressCode: "Modest attire. Archaeological site.", facilities: ["Museum", "Guided tours", "Beach nearby"], tags: ["UNESCO", "Heritage", "Surya Temple"], featured: false, famous: 4 },
  { id: 12, name: "Dilwara Jain Temples", deity: "Jain Tirthankaras", state: "Rajasthan", city: "Mount Abu", timing: "12:00 PM – 6:00 PM", emoji: "💠", history: "11th–13th century marble temple complex at Mount Abu, finest example of Jain architecture.", festivals: ["Paryushana", "Mahavir Jayanti"], dressCode: "No leather. No photography inside.", facilities: ["Dharamshalas", "Resort town nearby"], tags: ["Jain Heritage", "Marble Architecture"], featured: false, famous: 4 },
]

const CIRCUITS = [
  { name: "Char Dham Yatra", emoji: "🏔️", desc: "The four sacred pilgrimage sites in Uttarakhand.", stops: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"], duration: "10–14 days" },
  { name: "12 Jyotirlinga Circuit", emoji: "⚡", desc: "The twelve sacred Jyotirlinga temples of Lord Shiva across India.", stops: ["Somnath", "Kedarnath", "Kashi Vishwanath", "Rameshwaram", "+8 more"], duration: "30–45 days" },
  { name: "Shakti Peetha Circuit", emoji: "🌸", desc: "Pilgrimage to the 51 Shakti Peethas across India.", stops: ["Kamakhya", "Kalighat", "Vaishno Devi", "Meenakshi Amman"], duration: "45–60 days" },
  { name: "Pancha Bhuta Stalas", emoji: "🌿", desc: "Five Shiva temples in South India representing the five elements.", stops: ["Ekambareswarar", "Nataraja", "Arunachaleswarar", "Jambukeswarar", "Sri Kalahasti"], duration: "7–10 days" },
]

const STATES = [...new Set(TEMPLES.map(t => t.state))]

type Temple = typeof TEMPLES[0]

function TempleModal({ temple, onClose }: { temple: Temple; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Hero */}
        <div className="relative p-6 text-white rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #7B1829, #B85510)' }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors" style={{ background: 'rgba(255,255,255,0.15)' }}>✕</button>
          <div className="text-5xl mb-2">{temple.emoji}</div>
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{temple.deity}</div>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#FFD580' }}>{temple.name}</h2>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>📍 {temple.city}, {temple.state}</div>
        </div>

        <div className="p-5 space-y-4">
          {/* Timing & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ background: '#FBF8F3', border: '1px solid #E8DDD3' }}>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8C7B6B' }}>🕐 Darshan Timings</div>
              <div className="text-sm font-medium">{temple.timing}</div>
            </div>
            <div className="rounded-xl p-3" style={{ background: '#FBF8F3', border: '1px solid #E8DDD3' }}>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8C7B6B' }}>📍 Location</div>
              <div className="text-sm font-medium">{temple.city}, {temple.state}</div>
            </div>
          </div>

          {/* History */}
          <div>
            <h3 className="font-semibold mb-2 pb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#7B1829', borderBottom: '2px solid #FDF2E9' }}>About This Temple</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#4A3728' }}>{temple.history}</p>
          </div>

          {/* Festivals */}
          <div>
            <h3 className="font-semibold mb-2 pb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#7B1829', borderBottom: '2px solid #FDF2E9' }}>Festivals & Events</h3>
            <div className="space-y-1">
              {temple.festivals.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm py-1" style={{ borderBottom: '1px solid #E8DDD3', color: '#4A3728' }}>
                  <span>🎉</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* Dress Code */}
          <div className="rounded-xl p-3 text-sm" style={{ background: '#E6F4F4', color: '#0D6E6E' }}>
            👗 <strong>Dress Code:</strong> {temple.dressCode}
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-semibold mb-2 pb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#7B1829', borderBottom: '2px solid #FDF2E9' }}>Nearby Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {temple.facilities.map(f => (
                <span key={f} className="text-xs px-3 py-1 rounded-md" style={{ background: '#FBF8F3', border: '1px solid #E8DDD3', color: '#4A3728' }}>✅ {f}</span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {temple.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-md font-medium" style={{ background: '#F9EEF0', color: '#7B1829' }}>{tag}</span>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-3 rounded-xl text-white font-semibold transition-colors" style={{ background: '#7B1829' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function TempleCard({ temple, onOpen }: { temple: Temple; onOpen: (t: Temple) => void }) {
  return (
    <div
      onClick={() => onOpen(temple)}
      className="bg-white rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 relative"
      style={{ border: '1px solid #E8DDD3', boxShadow: '0 1px 4px rgba(139,74,20,0.06)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#E8711A')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#E8DDD3')}
    >
      {temple.featured && (
        <div className="absolute top-2 right-2 z-10 text-white text-xs font-semibold px-2 py-1 rounded" style={{ background: '#C9941A' }}>⭐ Featured</div>
      )}
      <div className="h-36 flex items-center justify-center relative text-5xl" style={{ background: 'linear-gradient(135deg, #C9941A, #8B1A2A)' }}>
        {temple.emoji}
        <div className="absolute bottom-2 left-2 text-white text-xs px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.5)' }}>📍 {temple.city}, {temple.state}</div>
      </div>
      <div className="p-4">
        <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#E8711A' }}>{temple.deity}</div>
        <h3 className="font-bold mb-2 leading-snug" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem' }}>{temple.name}</h3>
        <div className="text-xs mb-3 px-2 py-2 rounded-lg" style={{ background: '#FBF8F3', color: '#4A3728' }}>🕐 {temple.timing.split(',')[0]}</div>
        <div className="flex flex-wrap gap-1">
          {temple.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: '#E6F4F4', color: '#0D6E6E' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchState, setSearchState] = useState('all')
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'pilgrimage' | 'about'>('home')
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null)
  const [stateFilter, setStateFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const featuredTemples = TEMPLES.filter(t => t.featured)

  const filteredTemples = TEMPLES.filter(t => {
    const q = searchQuery.toLowerCase()
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.deity.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.state.toLowerCase().includes(q)
    const matchState = !stateFilter || t.state === stateFilter
    const matchFilterState = searchState === 'all' || t.state === searchState
    return matchQ && matchState && matchFilterState
  })

  function handleSearch() {
    setActiveTab('explore')
    setStateFilter(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FBF8F3', fontFamily: 'DM Sans, system-ui, sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ background: '#7B1829', padding: '0 1.5rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
        <div style={{ color: '#FFD580', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          🛕 Temple Heritage India
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['home', 'explore', 'pilgrimage', 'about'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'rgba(255,213,128,0.2)' : 'none',
                border: 'none', color: activeTab === tab ? '#FFD580' : 'rgba(255,255,255,0.75)',
                padding: '6px 14px', borderRadius: '6px', cursor: 'pointer',
                fontSize: '0.875rem', fontFamily: 'inherit', fontWeight: activeTab === tab ? 500 : 400, textTransform: 'capitalize'
              }}
            >
              {tab === 'pilgrimage' ? 'Pilgrimage' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HOME PAGE ── */}
      {activeTab === 'home' && (
        <div>
          {/* Hero */}
          <div style={{ background: 'linear-gradient(135deg, #7B1829 0%, #5B1020 40%, #8B2A1A 100%)', padding: '3rem 1.5rem 3.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: 'rgba(255,213,128,0.4)', marginBottom: '0.5rem' }}>ॐ</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#FFD580', fontWeight: 700, marginBottom: '0.75rem' }}>
              India Temple Heritage Portal
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Discover the sacred temples of India — history, rituals, darshan timings, and pilgrimage routes at your fingertips.
            </p>
            <div style={{ display: 'flex', maxWidth: '560px', margin: '0 auto', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search temples, deities, cities..."
                style={{ flex: 1, padding: '14px 18px', border: 'none', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none' }}
              />
              <select
                value={searchState}
                onChange={e => setSearchState(e.target.value)}
                style={{ padding: '14px 10px', border: 'none', borderLeft: '1px solid #E8DDD3', fontFamily: 'inherit', fontSize: '0.85rem', cursor: 'pointer', outline: 'none', background: '#fff' }}
              >
                <option value="all">All India</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
              <button
                onClick={handleSearch}
                style={{ padding: '14px 22px', background: '#E8711A', border: 'none', color: '#fff', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Search 🔍
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'center', gap: '3rem', borderBottom: '1px solid #E8DDD3', flexWrap: 'wrap' }}>
            {[['200+', 'Temples Listed'], ['28', 'States Covered'], ['50+', 'Pilgrimage Circuits'], ['12', 'Jyotirlinga Temples']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#7B1829' }}>{n}</div>
                <div style={{ fontSize: '0.75rem', color: '#8C7B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Featured Temples */}
          <div style={{ padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem' }}>Featured Temples</h2>
              <div style={{ flex: 1, height: '1px', background: '#E8DDD3' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {featuredTemples.map(t => <TempleCard key={t.id} temple={t} onOpen={setSelectedTemple} />)}
            </div>
          </div>

          {/* Browse by State */}
          <div style={{ padding: '0 1.5rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem' }}>Browse by State</h2>
              <div style={{ flex: 1, height: '1px', background: '#E8DDD3' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {STATES.map(s => {
                const count = TEMPLES.filter(t => t.state === s).length
                return (
                  <button
                    key={s}
                    onClick={() => { setStateFilter(s); setActiveTab('explore') }}
                    style={{ padding: '7px 16px', borderRadius: '20px', border: '1px solid #E8DDD3', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', color: '#4A3728', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FDF2E9'; e.currentTarget.style.borderColor = '#E8711A'; e.currentTarget.style.color = '#B85510' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E8DDD3'; e.currentTarget.style.color = '#4A3728' }}
                  >
                    {s} <span style={{ color: '#8C7B6B', fontSize: '0.75rem' }}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── EXPLORE PAGE ── */}
      {activeTab === 'explore' && (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
          {/* Sidebar */}
          <div style={{ width: '200px', minWidth: '200px', background: '#fff', borderRight: '1px solid #E8DDD3', padding: '1.25rem 0.875rem' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C7B6B', marginBottom: '0.5rem', paddingBottom: '0.4rem', borderBottom: '1px solid #E8DDD3' }}>By State</div>
            <button
              onClick={() => setStateFilter(null)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', padding: '5px 8px', borderRadius: '6px', border: 'none', background: !stateFilter ? '#FDF2E9' : 'none', color: !stateFilter ? '#B85510' : '#4A3728', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: !stateFilter ? 500 : 400, marginBottom: '2px' }}
            >
              All States
            </button>
            {STATES.map(s => (
              <button
                key={s}
                onClick={() => setStateFilter(s)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', padding: '5px 8px', borderRadius: '6px', border: 'none', background: stateFilter === s ? '#FDF2E9' : 'none', color: stateFilter === s ? '#B85510' : '#4A3728', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.83rem', fontWeight: stateFilter === s ? 500 : 400, marginBottom: '2px', textAlign: 'left' }}
              >
                {s}
                <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#8C7B6B' }}>{TEMPLES.filter(t => t.state === s).length}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search temples..."
                style={{ padding: '7px 14px', border: '1px solid #E8DDD3', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.875rem', outline: 'none', width: '200px' }}
              />
              {(['grid', 'list'] as const).map(v => (
                <button key={v} onClick={() => setViewMode(v)}
                  style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #E8DDD3', background: viewMode === v ? '#E8711A' : '#fff', color: viewMode === v ? '#fff' : '#4A3728', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                  {v === 'grid' ? '⊞ Grid' : '≡ List'}
                </button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: '#8C7B6B' }}>Showing {filteredTemples.length} temples</span>
            </div>

            {viewMode === 'grid' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
                {filteredTemples.map(t => <TempleCard key={t.id} temple={t} onOpen={setSelectedTemple} />)}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredTemples.map(t => (
                  <div key={t.id} onClick={() => setSelectedTemple(t)}
                    style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8DDD3', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8711A'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(139,74,20,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8DDD3'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ width: '52px', height: '52px', borderRadius: '10px', background: 'linear-gradient(135deg, #FEF9EE, #F9EEF0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{t.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontFamily: 'Playfair Display, serif', marginBottom: '2px' }}>{t.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#8C7B6B' }}>📍 {t.city}, {t.state} · {t.deity}</div>
                      <div style={{ marginTop: '4px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {t.tags.map(tag => <span key={tag} style={{ background: '#E6F4F4', color: '#0D6E6E', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '4px' }}>{tag}</span>)}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#0D6E6E', fontWeight: 500, whiteSpace: 'nowrap' }}>🕐 {t.timing.split('–')[0].trim()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PILGRIMAGE PAGE ── */}
      {activeTab === 'pilgrimage' && (
        <div>
          <div style={{ background: 'linear-gradient(135deg, #0D6E6E, #085050)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>🚶</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#A3DDD8', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Pilgrimage Circuits</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem' }}>Explore the sacred routes connecting the holiest temples of India</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', padding: '1.5rem' }}>
            {CIRCUITS.map(c => (
              <div key={c.name} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8DDD3', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,74,20,0.12)'; e.currentTarget.style.borderColor = '#E8711A' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#E8DDD3' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#7B1829', marginBottom: '4px' }}>{c.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#8C7B6B', lineHeight: 1.5, marginBottom: '10px' }}>{c.desc}</p>
                <div style={{ fontSize: '0.75rem', color: '#E8711A', fontWeight: 500, marginBottom: '8px' }}>⏱ {c.duration}</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {c.stops.map(s => <span key={s} style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', background: '#FDF2E9', color: '#B85510' }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ABOUT PAGE ── */}
      {activeTab === 'about' && (
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#7B1829', marginBottom: '1rem' }}>About This Portal</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#4A3728', marginBottom: '1rem' }}>
            The India Temple Heritage & Pilgrimage Information Portal is a centralized digital platform dedicated to preserving and sharing knowledge about India's rich temple heritage. Built to serve pilgrims, tourists, and researchers alike.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#4A3728', marginBottom: '1.5rem' }}>
            Developed as part of <strong>Unified Mentor's Incredible India initiative</strong>, this project bridges the gap between devotees and the sacred sites they wish to visit.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
            {[['🔍', 'Easy Discovery', 'Search by state, city, deity, or temple name.'], ['🕐', 'Darshan Timings', 'Accurate opening hours and schedules.'], ['🎉', 'Festival Calendars', 'Complete temple festivals and events.'], ['🗺️', 'Pilgrimage Routes', 'Curated circuits across India.'], ['📜', 'Heritage Stories', 'Detailed histories and significance.'], ['🏨', 'Visitor Info', 'Dress codes, facilities, and transport.']].map(([icon, title, desc]) => (
              <div key={title} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8DDD3', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: '#7B1829', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '0.78rem', color: '#8C7B6B', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#F9EEF0', borderRadius: '10px', borderLeft: '4px solid #7B1829' }}>
            <p style={{ fontSize: '0.85rem', color: '#7B1829', margin: 0 }}><strong>Phase 1 Scope:</strong> Web-only portal covering major temples. Future phases will include mobile apps, multilingual support, puja booking, and interactive route maps.</p>
          </div>
        </div>
      )}

      {/* Temple Modal */}
      {selectedTemple && <TempleModal temple={selectedTemple} onClose={() => setSelectedTemple(null)} />}

      {/* Footer */}
      <footer style={{ background: '#7B1829', color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: '1.25rem', fontSize: '0.82rem', marginTop: '2rem' }}>
        <strong style={{ color: '#FFD580' }}>Temple Heritage India</strong> — Unified Mentor · Incredible India Initiative &nbsp;|&nbsp; Phase 1 Web Portal
      </footer>
    </div>
  )
}