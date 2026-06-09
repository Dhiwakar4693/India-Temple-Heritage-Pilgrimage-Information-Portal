// scripts/seed.js
// Run: node scripts/seed.js
// Or: npm run seed

const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/temple-heritage'

const TempleSchema = new mongoose.Schema({
  name: String, deity: String, state: String, city: String, address: String,
  history: String, significance: String, timing: String, dressCode: String,
  entryFee: { type: String, default: 'Free' },
  festivals: [String], rituals: [String], facilities: [String], tags: [String],
  emoji: { type: String, default: '🛕' }, imageUrl: String,
  featured: { type: Boolean, default: false },
  famous: { type: Number, default: 3 },
  coordinates: { lat: Number, lng: Number },
  status: { type: String, default: 'published' },
}, { timestamps: true })

const CircuitSchema = new mongoose.Schema({
  name: String, emoji: String, description: String, region: String,
  stops: [String], duration: String,
  difficulty: { type: String, default: 'moderate' },
  bestSeason: String,
}, { timestamps: true })

const Temple = mongoose.models.Temple || mongoose.model('Temple', TempleSchema)
const Circuit = mongoose.models.Circuit || mongoose.model('Circuit', CircuitSchema)

const TEMPLES = [
  { name: "Brihadeeswarar Temple", deity: "Lord Shiva", state: "Tamil Nadu", city: "Thanjavur", timing: "6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM", emoji: "🛕", history: "Built by Raja Raja Chola I around 1010 CE, a UNESCO World Heritage Site. The vimana stands 66 metres tall and casts no shadow at noon.", significance: "UNESCO World Heritage Chola Temple", festivals: ["Maha Shivaratri", "Thiruvadhirai", "Karthigai Deepam"], rituals: ["Abhishekam", "Aarthi"], dressCode: "Traditional attire preferred. Men remove shirts inside sanctum.", facilities: ["Choultry", "Guesthouses", "Local transport"], tags: ["UNESCO", "Dravidian", "Chola"], featured: true, famous: 5, status: "published" },
  { name: "Meenakshi Amman Temple", deity: "Goddess Meenakshi", state: "Tamil Nadu", city: "Madurai", timing: "5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM", emoji: "🏛️", history: "Historic Hindu temple with 14 gopurams adorned with thousands of colorful sculptures, built during the Nayak period (1623–55 CE).", significance: "Shakti Peetha with supreme Dravidian architecture", festivals: ["Meenakshi Thirukalyanam", "Chithirai Festival", "Float Festival"], rituals: ["Alangaram", "Midnight Puja"], dressCode: "Modest clothing required. No shorts or sleeveless.", facilities: ["Parking", "Cloakroom", "Nearby hotels"], tags: ["Shakti Peetha", "Famous", "Dravidian"], featured: true, famous: 5, status: "published" },
  { name: "Kashi Vishwanath Temple", deity: "Lord Shiva", state: "Uttar Pradesh", city: "Varanasi", timing: "3:00 AM – 11:00 PM", emoji: "⛩️", history: "One of the twelve Jyotirlingas on the western bank of the Ganges. The current structure was built by Ahilya Bai Holkar in 1780.", significance: "Most sacred Jyotirlinga in the eternal city of Varanasi", festivals: ["Maha Shivaratri", "Dev Deepawali", "Shravan Somvar"], rituals: ["Mangala Aarti", "Bhog Aarti", "Sapta Rishi Aarti"], dressCode: "Clean and modest traditional attire.", facilities: ["Ghats nearby", "Dharamshala", "Boat rides"], tags: ["Jyotirlinga", "Char Dham", "Sacred"], featured: true, famous: 5, status: "published" },
  { name: "Tirupati Venkateswara Temple", deity: "Lord Vishnu", state: "Andhra Pradesh", city: "Tirupati", timing: "2:30 AM – 1:00 AM", emoji: "🌟", history: "One of the richest and most visited religious sites in the world, receiving 50,000–100,000 pilgrims daily on the Tirumala hills.", significance: "Richest temple, most visited pilgrimage globally", festivals: ["Brahmotsavam", "Vaikunta Ekadasi", "Rathasapthami"], rituals: ["Suprabhatam", "Archana", "Thomala Seva"], dressCode: "Traditional Indian attire mandatory.", entryFee: "Free darshan; special darshan ₹300", facilities: ["TTD choultries", "Prasadam counters", "Online booking"], tags: ["Vaishnava", "Famous", "Tirumala"], featured: true, famous: 5, status: "published" },
  { name: "Somnath Temple", deity: "Lord Shiva", state: "Gujarat", city: "Veraval", timing: "6:00 AM – 9:30 PM", emoji: "🌊", history: "First of the twelve Jyotirlingas on Gujarat's western coast. Destroyed and rebuilt multiple times; current structure inaugurated by Sardar Patel in 1951.", significance: "First Jyotirlinga, historically significant coastal temple", festivals: ["Maha Shivaratri", "Kartik Purnima"], rituals: ["Abhishek", "Aarti"], dressCode: "Traditional and modest attire.", facilities: ["Trust guesthouses", "Sea view promenade", "Museum"], tags: ["Jyotirlinga", "Coastal", "Heritage"], featured: false, famous: 4, status: "published" },
  { name: "Kedarnath Temple", deity: "Lord Shiva", state: "Uttarakhand", city: "Kedarnath", timing: "6:00 AM – 3:00 PM, 5:00 PM – 9:00 PM (May–Nov)", emoji: "🏔️", history: "Jyotirlinga at 3,583m in the Himalayas, built by the Pandavas and revived by Adi Shankaracharya.", significance: "Highest Jyotirlinga, part of Char Dham yatra", festivals: ["Char Dham Yatra opening", "Maha Shivaratri"], rituals: ["Mahabhishek", "Rudrabhishek"], dressCode: "Warm clothing essential.", facilities: ["Helicopter service", "GMVN guesthouses", "Medical facilities"], tags: ["Jyotirlinga", "Char Dham", "Himalayan"], featured: false, famous: 4, status: "published" },
  { name: "Jagannath Temple", deity: "Lord Jagannath", state: "Odisha", city: "Puri", timing: "5:00 AM – 12:00 PM, 4:00 PM – 11:00 PM", emoji: "🎪", history: "12th-century Char Dham temple famous for annual Rath Yatra, built by King Anantaganabhima.", significance: "One of four Char Dham sites, famous for Rath Yatra", festivals: ["Rath Yatra", "Snana Yatra", "Chandan Yatra"], rituals: ["Mangala Aarti", "Bhoga Mandap"], dressCode: "Only Hindus allowed. No leather items.", facilities: ["Pilgrim accommodation", "Mahaprasad stalls"], tags: ["Char Dham", "Vaishnava", "Rath Yatra"], featured: false, famous: 5, status: "published" },
  { name: "Harmandir Sahib (Golden Temple)", deity: "Guru Granth Sahib", state: "Punjab", city: "Amritsar", timing: "Open 24 hours", emoji: "✨", history: "Built in 1604 by Guru Arjan Dev Ji, covered in gold leaf, sits in Amrit Sarovar. Welcomes all religions with free langar.", significance: "Holiest Sikh gurdwara, open to all faiths", festivals: ["Baisakhi", "Guru Nanak Jayanti", "Gurpurab"], rituals: ["Ardas", "Kirtan", "Langar Seva"], dressCode: "Head covered. Remove shoes. Modest clothing.", facilities: ["Free langar 24hrs", "Sarovar bathing", "Guesthouses", "Museum"], tags: ["Sikh Heritage", "UNESCO", "Open 24hr"], featured: true, famous: 5, status: "published" },
  { name: "Rameshwaram Temple", deity: "Lord Shiva", state: "Tamil Nadu", city: "Rameswaram", timing: "5:00 AM – 1:00 PM, 3:00 PM – 9:00 PM", emoji: "🌺", history: "Jyotirlinga and Char Dham with India's longest corridor (1220m) and 22 teerthas. Associated with the Ramayana.", significance: "Southernmost Char Dham and Jyotirlinga", festivals: ["Maha Shivaratri", "Brahmotsavam"], rituals: ["Teertham bath (22 wells)", "Abhishekam"], dressCode: "Men remove shirts inside. Wet clothes allowed.", facilities: ["Dharamshala", "Teertham facilities", "Sea beach"], tags: ["Jyotirlinga", "Char Dham", "Coastal"], featured: false, famous: 4, status: "published" },
  { name: "Vaishno Devi Temple", deity: "Goddess Vaishno Devi", state: "Jammu & Kashmir", city: "Katra", timing: "Open 24 hours", emoji: "⛰️", history: "Cave shrine in the Trikuta Mountains housing three natural pindis. Receives 8–10 million pilgrims annually.", significance: "Most visited Shakti Peetha, 8–10 million annual pilgrims", festivals: ["Navratri", "Diwali", "Ashtami"], rituals: ["Pindi Darshan", "Aarti", "Havan"], dressCode: "Modest clothing. No footwear inside cave.", facilities: ["SMVDSB facilities", "Battery cars", "Helicopters"], tags: ["Shakti Peetha", "Famous", "Cave Shrine"], featured: false, famous: 5, status: "published" },
  { name: "Sun Temple Konark", deity: "Surya (Sun God)", state: "Odisha", city: "Konark", timing: "6:00 AM – 8:00 PM", emoji: "☀️", history: "13th-century UNESCO World Heritage chariot-shaped temple by King Narasimhadeva I with intricate sculptures.", significance: "UNESCO World Heritage, masterpiece of Kalinga architecture", festivals: ["Konark Dance Festival", "Magha Saptami"], rituals: ["Surya Puja"], dressCode: "Modest attire. Archaeological site.", entryFee: "₹40 (Indian), ₹600 (Foreign)", facilities: ["Museum", "Guided tours", "Beach nearby"], tags: ["UNESCO", "Heritage", "Surya Temple"], featured: false, famous: 4, status: "published" },
  { name: "Dilwara Jain Temples", deity: "Jain Tirthankaras", state: "Rajasthan", city: "Mount Abu", timing: "12:00 PM – 6:00 PM", emoji: "💠", history: "11th–13th century marble temple complex at Mount Abu, finest example of Jain architecture and marble craftsmanship.", significance: "Supreme Jain pilgrimage, finest marble temples", festivals: ["Paryushana", "Mahavir Jayanti"], rituals: ["Puja", "Samayik"], dressCode: "No leather. No photography inside.", facilities: ["Dharamshalas", "Resort town nearby"], tags: ["Jain Heritage", "Marble Architecture", "Rajasthan"], featured: false, famous: 4, status: "published" },
]

const CIRCUITS = [
  { name: "Char Dham Yatra", emoji: "🏔️", description: "The four sacred Hindu pilgrimage sites in Uttarakhand — the most revered circuit in North India.", region: "North India", stops: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"], duration: "10–14 days", difficulty: "challenging", bestSeason: "May–June, September–October" },
  { name: "12 Jyotirlinga Circuit", emoji: "⚡", description: "The twelve sacred Jyotirlinga temples of Lord Shiva spread across India — a lifetime pilgrimage.", region: "Pan India", stops: ["Somnath", "Mallikarjuna", "Mahakaleshwar", "Omkareshwar", "Kedarnath", "Bhimashankar", "Kashi Vishwanath", "Trimbakeshwar", "Vaidyanath", "Nageshwar", "Rameshwaram", "Grishneshwar"], duration: "30–45 days", difficulty: "challenging", bestSeason: "November–February" },
  { name: "Shakti Peetha Circuit", emoji: "🌸", description: "Pilgrimage to the 51 Shakti Peethas — where the limbs of Goddess Sati are said to have fallen.", region: "Pan India", stops: ["Kamakhya", "Kalighat", "Jwalamukhi", "Vaishno Devi", "Meenakshi Amman"], duration: "45–60 days", difficulty: "moderate", bestSeason: "October–March" },
  { name: "Pancha Bhuta Stalas", emoji: "🌿", description: "Five Shiva temples in South India, each representing one of the five natural elements.", region: "South India", stops: ["Ekambareswarar (Earth)", "Thillai Nataraja (Space)", "Arunachaleswarar (Fire)", "Jambukeswarar (Water)", "Sri Kalahasti (Air)"], duration: "7–10 days", difficulty: "easy", bestSeason: "Year-round" },
  { name: "Divya Desam Circuit", emoji: "🪷", description: "108 Vishnu temples sacred to the Vaishnavite tradition.", region: "South India", stops: ["Srirangam", "Tirupati", "Badrinath", "Ahobilam", "Muktinath (Nepal)"], duration: "30–45 days", difficulty: "moderate", bestSeason: "November–February" },
  { name: "Parikrama of Varanasi", emoji: "🪔", description: "Sacred circumambulation of Varanasi, visiting major temples and ghats along the Ganges.", region: "North India", stops: ["Kashi Vishwanath", "Sankat Mochan", "Durga Temple", "Bharat Mata Temple", "Tulsi Manas Temple"], duration: "3–5 days", difficulty: "easy", bestSeason: "October–March" },
]

async function seed() {
  console.log('🛕 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected')

  console.log('🗑️  Clearing existing data...')
  await Temple.deleteMany({})
  await Circuit.deleteMany({})

  console.log('🌱 Seeding temples...')
  await Temple.insertMany(TEMPLES)
  console.log(`✅ Inserted ${TEMPLES.length} temples`)

  console.log('🌱 Seeding circuits...')
  await Circuit.insertMany(CIRCUITS)
  console.log(`✅ Inserted ${CIRCUITS.length} circuits`)

  await mongoose.disconnect()
  console.log('\n🎉 Seed complete! Database is ready.')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
