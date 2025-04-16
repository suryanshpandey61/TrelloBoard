import '../app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'A Trello-like drag and drop board built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}
