import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Temple Heritage India | Sacred Temples, Pilgrimage & Heritage Portal',
  description:
    'Discover India\'s sacred temples — history, rituals, darshan timings, festivals, and pilgrimage routes. A centralized portal for pilgrims, tourists, and researchers.',
  keywords: 'India temples, pilgrimage, Hindu temples, darshan timings, Jyotirlinga, Char Dham, temple heritage',
  openGraph: {
    title: 'Temple Heritage India',
    description: 'India\'s most comprehensive temple heritage and pilgrimage portal',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="bg-temple-cream font-sans antialiased">{children}</body>
    </html>
  )
}
