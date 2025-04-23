'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  name: string
  email: string
  iat?: number
  exp?: number
}

type AuthContextType = {
  user: User | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode<User>(token)
      setUser(decoded)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
