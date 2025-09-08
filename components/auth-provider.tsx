"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("educonnect_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        document.cookie = `educonnect_user=${JSON.stringify(parsedUser)}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
      } catch (error) {
        localStorage.removeItem("educonnect_user")
        document.cookie = "educonnect_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    console.log("[v0] Login attempt for:", email)

    try {
      // Call the API route instead of mock authentication
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("[v0] API response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Login successful, user data:", data.user)

        const user = data.user
        setUser(user)
        localStorage.setItem("educonnect_user", JSON.stringify(user))
        document.cookie = `educonnect_user=${JSON.stringify(user)}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days
        return true
      } else {
        const errorData = await response.json()
        console.log("[v0] Login failed:", errorData.error)
        return false
      }
    } catch (error) {
      console.log("[v0] Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("educonnect_user")
    localStorage.removeItem("educonnect_current_school")
    document.cookie = "educonnect_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
