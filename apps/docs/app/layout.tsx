import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shak Hooks',
  description: 'Production-ready, open-source frontend hooks platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Shak Hooks</Link>
            <div className="flex gap-4">
              <Link href="/hooks" className="hover:underline">Hooks</Link>
              <Link href="/examples" className="hover:underline">Examples</Link>
              <a href="https://github.com/huzzainajith-arch/shak-hooks" className="hover:underline">GitHub</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
