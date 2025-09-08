"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useSchool } from "@/components/school-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Phone, Mail, Users, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import type { School } from "@/lib/types"

export default function SchoolSelectionPage() {
  const { user } = useAuth()
  const { availableSchools, switchSchool, currentSchool } = useSchool()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Redirect if user only has access to one school
    if (availableSchools.length === 1 && currentSchool) {
      router.push(getDashboardRoute(user?.role || "parent"))
    }
  }, [availableSchools, currentSchool, user, router])

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin"
      case "teacher":
        return "/teacher"
      case "parent":
        return "/parent"
      default:
        return "/parent"
    }
  }

  const handleSchoolSelect = async (school: School) => {
    setIsLoading(true)
    const success = await switchSchool(school.id)
    if (success) {
      router.push(getDashboardRoute(user?.role || "parent"))
    }
    setIsLoading(false)
  }

  const getSubscriptionBadge = (plan: string) => {
    const badges = {
      basic: { label: "Basique", variant: "secondary" as const },
      standard: { label: "Standard", variant: "default" as const },
      premium: { label: "Premium", variant: "default" as const },
    }
    return badges[plan as keyof typeof badges] || badges.basic
  }

  if (availableSchools.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle>Aucune école accessible</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Vous n'avez accès à aucune école pour le moment.</p>
            <p className="text-sm text-muted-foreground">Contactez votre administrateur pour obtenir l'accès.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sélectionnez votre école</h1>
          <p className="text-muted-foreground">Choisissez l'établissement auquel vous souhaitez accéder</p>
          {user?.role === "admin" && availableSchools.length > 1 && (
            <div className="flex items-center justify-center mt-4">
              <Crown className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm text-muted-foreground">Accès administrateur multi-écoles</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableSchools.map((school) => (
            <Card
              key={school.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                currentSchool?.id === school.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSchoolSelect(school)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      {school.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge {...getSubscriptionBadge(school.subscription_plan || "basic")}>
                        {getSubscriptionBadge(school.subscription_plan || "basic").label}
                      </Badge>
                      {currentSchool?.id === school.id && (
                        <Badge variant="outline" className="text-xs">
                          Actuel
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {school.address && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{school.address}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {school.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{school.phone}</span>
                    </div>
                  )}
                  {school.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{school.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Max {school.max_students || 500} élèves</span>
                  </div>

                  <Button size="sm" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    {currentSchool?.id === school.id ? "Accéder" : "Sélectionner"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Vous pouvez changer d'école à tout moment depuis la barre de navigation
          </p>
        </div>
      </div>
    </div>
  )
}
