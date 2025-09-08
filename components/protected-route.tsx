"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("admin" | "teacher" | "parent")[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès non autorisé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
