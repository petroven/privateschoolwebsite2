"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookOpen, Calendar, MessageSquare, TrendingUp, AlertCircle, CheckCircle, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function ParentDashboard() {
  // Mock data - will be replaced with real API calls
  const children = [
    {
      id: "1",
      firstName: "Emma",
      lastName: "Dubois",
      class: "CM2 A",
      teacher: "Prof. Martin",
      averageGrade: 15.2,
      attendance: 95,
      lastGrade: { subject: "Mathématiques", grade: 16, date: "2024-01-15" },
      recentAbsence: null,
    },
    {
      id: "2",
      firstName: "Lucas",
      lastName: "Dubois",
      class: "CE2 B",
      teacher: "Mme Petit",
      averageGrade: 13.8,
      attendance: 88,
      lastGrade: { subject: "Français", grade: 14, date: "2024-01-14" },
      recentAbsence: { date: "2024-01-10", justified: true },
    },
  ]

  const recentNews = [
    {
      id: "1",
      title: "Sortie scolaire au Musée des Sciences",
      date: "2024-01-20",
      excerpt: "Les classes de CM1 et CM2 visiteront le Musée des Sciences le 25 janvier...",
    },
    {
      id: "2",
      title: "Réunion parents-professeurs",
      date: "2024-01-18",
      excerpt: "Les réunions individuelles auront lieu du 22 au 26 janvier...",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Contrôle de mathématiques",
      date: "2024-01-22",
      class: "CM2 A",
      type: "evaluation",
    },
    {
      id: "2",
      title: "Sortie pédagogique",
      date: "2024-01-25",
      class: "CM2 A",
      type: "event",
    },
  ]

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600 dark:text-green-400"
    if (grade >= 12) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return "text-green-600 dark:text-green-400"
    if (attendance >= 85) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tableau de bord - Parent</h1>
            <p className="text-gray-600 dark:text-gray-400">Suivez la scolarité de vos enfants</p>
          </div>

          {/* Children Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {children.map((child) => (
              <Card key={child.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {child.firstName[0]}
                          {child.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl text-gray-900 dark:text-white">
                          {child.firstName} {child.lastName}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{child.class}</Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{child.teacher}</span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/parent/children/${child.id}`}>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moyenne générale</p>
                      <p className={`text-2xl font-bold ${getGradeColor(child.averageGrade)}`}>
                        {child.averageGrade}/20
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assiduité</p>
                      <p className={`text-2xl font-bold ${getAttendanceColor(child.attendance)}`}>
                        {child.attendance}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Dernière note</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                          {child.lastGrade.subject}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {child.lastGrade.grade}/20 - {new Date(child.lastGrade.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>

                    {child.recentAbsence ? (
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                            Absence récente
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-orange-900 dark:text-orange-100">
                            {new Date(child.recentAbsence.date).toLocaleDateString("fr-FR")}
                          </p>
                          <Badge variant={child.recentAbsence.justified ? "default" : "destructive"}>
                            {child.recentAbsence.justified ? "Justifiée" : "Non justifiée"}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            Aucune absence récente
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/parent/grades">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Consulter les notes
                  </Button>
                </Link>
                <Link href="/parent/absences">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Voir les absences
                  </Button>
                </Link>
                <Link href="/parent/messages">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
                <Link href="/parent/schedule">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Emploi du temps
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* School News */}
            <Card>
              <CardHeader>
                <CardTitle>Actualités de l'école</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNews.map((news) => (
                    <div key={news.id} className="border-l-4 border-l-blue-500 pl-4">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{news.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {new Date(news.date).toLocaleDateString("fr-FR")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{news.excerpt}</p>
                    </div>
                  ))}
                </div>
                <Link href="/parent/news">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Voir toutes les actualités
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {event.class}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                      <Badge variant={event.type === "evaluation" ? "destructive" : "default"}>
                        {event.type === "evaluation" ? "Évaluation" : "Événement"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Link href="/parent/calendar">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Voir le calendrier complet
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
