# 🛕 India Temple Heritage & Pilgrimage Portal

A full-stack Next.js web portal for India's sacred temples — built for the **Unified Mentor · Incredible India** initiative.

---

## ✨ Features

- 🔍 Search temples by name, deity, state, city, or tag
- 📍 State & deity-based filtering
- 🕐 Darshan timings, dress codes, visitor guidelines
- 🎉 Festival calendars per temple
- 🗺️ Pilgrimage circuit guides (Char Dham, Jyotirlinga, etc.)
- ⚙️ Admin CMS: add, edit, approve, delete temples
- 📊 Admin dashboard with stats and charts
- 🏛️ Full temple detail pages with history
- 📱 Fully responsive (mobile + desktop)

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your MongoDB URI
```

### 3. Start MongoDB
```bash
# Local: make sure MongoDB is running
mongod

# Or use MongoDB Atlas (free tier at mongodb.com/atlas)
```

### 4. Seed the database
```bash
npm run seed
# This populates 12 temples and 6 pilgrimage circuits
```

### 5. Start the dev server
```bash
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure

```
temple-portal/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── temples/
│   │   │   │   ├── route.ts          # GET all temples, POST new
│   │   │   │   └── [id]/route.ts     # GET, PUT, DELETE by ID
│   │   │   ├── states/route.ts       # GET state list with counts
│   │   │   ├── circuits/route.ts     # GET/POST pilgrimage circuits
│   │   │   └── admin/route.ts        # GET admin stats
│   │   ├── explore/                  # Explore page
│   │   ├── pilgrimage/               # Pilgrimage routes page
│   │   ├── about/                    # About page
│   │   ├── admin/                    # Admin CMS
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer
│   │   ├── temple/                   # TempleCard, TempleModal
│   │   └── ui/                       # Shared UI components
│   ├── lib/
│   │   ├── db.ts                     # MongoDB connection
│   │   └── models/
│   │       ├── Temple.ts             # Temple Mongoose model
│   │       └── Circuit.ts            # Circuit Mongoose model
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   └── data/
│       └── seed.ts                   # Seed data
├── scripts/
│   └── seed.js                       # Database seeder
├── .env.example                      # Environment variable template
├── tailwind.config.ts
└── package.json
```

---

## 🔌 API Reference

### Temples

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/temples` | List all temples (with filters) |
| POST | `/api/temples` | Create a new temple |
| GET | `/api/temples/:id` | Get temple by ID |
| PUT | `/api/temples/:id` | Update temple |
| DELETE | `/api/temples/:id` | Delete temple |

#### Query Parameters (GET /api/temples)
```
?query=shiva          # Full-text search
?state=Tamil Nadu     # Filter by state
?deity=Lord Shiva     # Filter by deity
?tag=UNESCO           # Filter by tag
?featured=true        # Featured temples only
?status=published     # published / pending / draft
?sort=name            # name / state / famous / newest
?page=1&limit=20      # Pagination
```

### States
```
GET /api/states       # List all states with temple count
```

### Circuits
```
GET /api/circuits     # List all pilgrimage circuits
POST /api/circuits    # Create circuit
```

### Admin
```
GET /api/admin        # Dashboard stats (totals, state breakdown, deity breakdown)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes (App Router) |
| Database | MongoDB with Mongoose |
| Deployment | Vercel + MongoDB Atlas |

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI = your MongoDB Atlas connection string
```

---

## 📈 KPIs to Track (from PRD)

- Temples listed (target: 200+ in Phase 2)
- Monthly active users
- Search success rate
- Page engagement time
- User satisfaction score

---

## 🔮 Future Enhancements (Phase 2)

- [ ] Multilingual support (Tamil, Hindi, Telugu, etc.)
- [ ] Online darshan & puja booking
- [ ] Interactive map with pilgrimage route planning
- [ ] Native mobile apps (React Native)
- [ ] Donation & charity modules
- [ ] User accounts & saved temples
- [ ] Temple photo galleries

---

## 📄 License

Developed for **Unified Mentor · Incredible India** academic project.
