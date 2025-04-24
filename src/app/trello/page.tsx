'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useEffect} from 'react'
import Board from '@/app/components/Board'
import { useRouter } from 'next/navigation'

export default function TrelloPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if (!user) router.push('/login')
  }, [user,router])

  if (!user) return null

  return (
    <main className="p-6">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <Board userId={user.id} />
    </main>
  )
}
