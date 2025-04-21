'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
}

// Fix: don't initialize with null, use undefined with proper typing
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const session = document.cookie
      .split('; ')
      .find((row) => row.startsWith('session_user='))
    if (session) {
      const raw = decodeURIComponent(session.split('=')[1])
      try {
        setUser(JSON.parse(raw))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
