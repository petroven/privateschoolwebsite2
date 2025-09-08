"use client"

import { useAuth } from "@/components/auth-provider"
import { useSchool } from "@/components/school-provider"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, BookOpen, Calendar, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const { currentSchool, availableSchools, isLoading: schoolLoading } = useSchool()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading && !schoolLoading) {
      if (availableSchools.length > 1 && !currentSchool) {
        router.push("/school-selection")
        return
      }

      if (currentSchool || availableSchools.length === 1) {
        switch (user.role) {
          case "admin":
            router.push("/admin")
            break
          case "teacher":
            router.push("/teacher")
            break
          case "parent":
            router.push("/parent")
            break
        }
      }
    }
  }, [user, isLoading, schoolLoading, currentSchool, availableSchools, router])

  if (isLoading || schoolLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-primary p-4 rounded-full">
                  <GraduationCap className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Bienvenue sur EduConnect</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                La plateforme éducative complète pour la gestion scolaire des écoles privées. Connectez parents,
                professeurs et administration en un seul endroit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Se connecter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline">
                    S'inscrire comme parent
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Une solution complète pour votre école</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                EduConnect simplifie la gestion scolaire avec des outils modernes et intuitifs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Administration centralisée des comptes parents, professeurs et élèves
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Suivi pédagogique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notes, devoirs, absences et bulletins accessibles en temps réel
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Planning intégré</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Emplois du temps, événements et calendrier scolaire synchronisés
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à moderniser votre école ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez les écoles qui font confiance à EduConnect pour leur gestion quotidienne
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Nous contacter
              </Button>
            </Link>
          </div>
        </section>
      </div>
    )
  }

  if (availableSchools.length > 1 && !currentSchool) {
    return null // Will redirect to school-selection
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenue sur EduConnect</h1>
          <p className="text-muted-foreground">Votre plateforme éducative complète pour la gestion scolaire</p>
          {currentSchool && (
            <p className="text-sm text-muted-foreground mt-2">
              École actuelle : <span className="font-medium">{currentSchool.name}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Écoles</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableSchools.length}</div>
              <p className="text-xs text-muted-foreground">
                {availableSchools.length > 1 ? "Écoles accessibles" : "École connectée"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Comptes actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Classe configurée</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Année scolaire</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2024-2025</div>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
