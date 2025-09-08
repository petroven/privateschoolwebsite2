"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { School } from "@/lib/types"
import { useAuth } from "@/components/auth-provider"

interface SchoolContextType {
  currentSchool: School | null
  availableSchools: School[]
  switchSchool: (schoolId: string) => Promise<boolean>
  isLoading: boolean
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined)

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [currentSchool, setCurrentSchool] = useState<School | null>(null)
  const [availableSchools, setAvailableSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadSchoolData()
    } else {
      setCurrentSchool(null)
      setAvailableSchools([])
      setIsLoading(false)
    }
  }, [user])

  const loadSchoolData = async () => {
    setIsLoading(true)
    try {
      // Mock school data - replace with real API calls
      const mockSchools: School[] = [
        {
          id: "1",
          name: "École Sainte-Marie",
          address: "123 Rue de la Paix, 75001 Paris",
          phone: "01 42 36 12 34",
          email: "contact@sainte-marie.fr",
          logo_url: "/generic-school-logo.png",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Institut Saint-Joseph",
          address: "456 Avenue des Champs, 69001 Lyon",
          phone: "04 78 25 67 89",
          email: "info@saint-joseph.fr",
          logo_url: "/generic-school-logo.png",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Collège Notre-Dame",
          address: "789 Boulevard Victor Hugo, 13001 Marseille",
          phone: "04 91 54 32 10",
          email: "secretariat@notre-dame.fr",
          logo_url: "/generic-school-logo.png",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]

      // Filter schools based on user role and permissions
      let userSchools: School[] = []

      if (user?.role === "admin") {
        // Super admin can access all schools
        userSchools = mockSchools
      } else {
        // Teachers and parents can only access their assigned school
        userSchools = mockSchools.filter((school) => school.id === user?.school_id)
      }

      setAvailableSchools(userSchools)

      // Set current school based on user's school_id or saved preference
      const savedSchoolId = localStorage.getItem("educonnect_current_school")
      const targetSchoolId = savedSchoolId || user?.school_id
      const targetSchool = userSchools.find((school) => school.id === targetSchoolId)

      if (targetSchool) {
        setCurrentSchool(targetSchool)
        localStorage.setItem("educonnect_current_school", targetSchool.id)
      } else if (userSchools.length > 0) {
        // Fallback to first available school
        setCurrentSchool(userSchools[0])
        localStorage.setItem("educonnect_current_school", userSchools[0].id)
      }
    } catch (error) {
      console.error("Failed to load school data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const switchSchool = async (schoolId: string): Promise<boolean> => {
    const targetSchool = availableSchools.find((school) => school.id === schoolId)
    if (!targetSchool) {
      return false
    }

    try {
      setCurrentSchool(targetSchool)
      localStorage.setItem("educonnect_current_school", schoolId)
      return true
    } catch (error) {
      console.error("Failed to switch school:", error)
      return false
    }
  }

  return (
    <SchoolContext.Provider value={{ currentSchool, availableSchools, switchSchool, isLoading }}>
      {children}
    </SchoolContext.Provider>
  )
}

export function useSchool() {
  const context = useContext(SchoolContext)
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider")
  }
  return context
}
