import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Load the Inter font for text
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ORG PORTAL',
  description: 'Enterprise ERP Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* THIS LINK IS THE KEY. It loads the icons. */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}