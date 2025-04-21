'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-main">
      <h1 className="text-4xl font-bold mb-10 text-yellow-500">Trello Clone</h1>
      <div className="flex gap-6">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded shadow"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded shadow"
          onClick={() => router.push('/signup')}
        >
          Signup
        </button>
      </div>
    </main>
  )
}
