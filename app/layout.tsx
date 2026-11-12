import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-editorial', display: 'swap' })
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: 'Lilianne Acupuncture — Acupuncture & Wellness',
  description: 'Discover Lilianne Acupuncture: thoughtful, personalized care and a quiet space to restore your balance. In English and French.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAF9F6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}
