"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, ChevronLeft, ChevronRight, Clock, MapPin, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState("month")

  // Mock data - will be replaced with real API calls
  const events = [
    {
      id: "1",
      title: "Réunion parents-professeurs",
      date: "2024-01-22",
      startTime: "18:00",
      endTime: "20:00",
      type: "meeting",
      location: "Salle polyvalente",
      participants: ["parents", "teachers"],
      description: "Rencontres individuelles parents-professeurs pour le premier trimestre",
    },
    {
      id: "2",
      title: "Sortie au Musée des Sciences",
      date: "2024-01-25",
      startTime: "09:00",
      endTime: "16:00",
      type: "trip",
      location: "Musée des Sciences",
      participants: ["CM1 A", "CM2 A"],
      description: "Visite pédagogique du Musée des Sciences pour les classes de CM1 et CM2",
    },
    {
      id: "3",
      title: "Contrôle de mathématiques",
      date: "2024-01-24",
      startTime: "10:00",
      endTime: "11:00",
      type: "exam",
      location: "Salle 101",
      participants: ["CM2 A"],
      description: "Évaluation sur les fractions et les nombres décimaux",
    },
    {
      id: "4",
      title: "Formation pédagogique",
      date: "2024-01-26",
      startTime: "14:00",
      endTime: "17:00",
      type: "training",
      location: "Salle des professeurs",
      participants: ["teachers"],
      description: "Formation sur les nouvelles méthodes d'évaluation",
    },
    {
      id: "5",
      title: "Conseil d'école",
      date: "2024-01-30",
      startTime: "18:30",
      endTime: "20:30",
      type: "meeting",
      location: "Bureau de direction",
      participants: ["admin", "teachers", "parents"],
      description: "Conseil d'école trimestriel - ordre du jour à définir",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "trip":
        return "bg-green-100 text-green-800 border-green-200"
      case "exam":
        return "bg-red-100 text-red-800 border-red-200"
      case "training":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "holiday":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "meeting":
        return "Réunion"
      case "trip":
        return "Sortie"
      case "exam":
        return "Évaluation"
      case "training":
        return "Formation"
      case "holiday":
        return "Vacances"
      default:
        return type
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="h-4 w-4" />
      case "trip":
        return <MapPin className="h-4 w-4" />
      case "exam":
        return <BookOpen className="h-4 w-4" />
      case "training":
        return <Clock className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const formatTime = (time: string) => {
    return time.slice(0, 5)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const eventStats = {
    total: events.length,
    thisWeek: events.filter((e) => {
      const eventDate = new Date(e.date)
      const now = new Date()
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
      const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6))
      return eventDate >= weekStart && eventDate <= weekEnd
    }).length,
    meetings: events.filter((e) => e.type === "meeting").length,
    exams: events.filter((e) => e.type === "exam").length,
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calendrier Scolaire</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Planifiez et gérez les événements de votre établissement
              </p>
            </div>
            <div className="flex space-x-2">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mois</SelectItem>
                  <SelectItem value="week">Semaine</SelectItem>
                  <SelectItem value="day">Jour</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/admin/calendar/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Événements totaux</p>
                    <p className="text-2xl font-bold">{eventStats.total}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cette semaine</p>
                    <p className="text-2xl font-bold text-blue-600">{eventStats.thisWeek}</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Réunions</p>
                    <p className="text-2xl font-bold text-green-600">{eventStats.meetings}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Évaluations</p>
                    <p className="text-2xl font-bold text-red-600">{eventStats.exams}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Navigation */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Vue calendrier en développement</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Utilisez la liste des événements ci-contre pour gérer votre planning
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Événements à venir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getEventIcon(event.type)}
                            <h4 className="font-semibold text-sm">{event.title}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs">
                          <p className="font-medium">{formatDate(event.date)}</p>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatTime(event.startTime)} - {formatTime(event.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                          {event.participants.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {event.participants.map((participant, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {participant}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">Aucun événement à venir</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/calendar/new?type=meeting">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Planifier une réunion
                    </Button>
                  </Link>
                  <Link href="/admin/calendar/new?type=exam">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Programmer une évaluation
                    </Button>
                  </Link>
                  <Link href="/admin/calendar/new?type=trip">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MapPin className="mr-2 h-4 w-4" />
                      Organiser une sortie
                    </Button>
                  </Link>
                  <Link href="/admin/calendar/holidays">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Gérer les vacances
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
