"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users, BookOpen, Filter } from "lucide-react"
import { useState } from "react"

export default function TeacherCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState("month")
  const [filterType, setFilterType] = useState("all")

  // Mock data - will be replaced with real API calls
  // Only events relevant to teachers (event_type = 'teacher' or 'both')
  const events = [
    {
      id: "1",
      title: "Réunion équipe pédagogique",
      date: "2024-01-22",
      startTime: "16:00",
      endTime: "17:30",
      type: "meeting",
      eventType: "teacher",
      location: "Salle des professeurs",
      description: "Réunion mensuelle de l'équipe pédagogique",
      color: "#3b82f6",
    },
    {
      id: "2",
      title: "Formation continue - Numérique",
      date: "2024-01-24",
      startTime: "14:00",
      endTime: "17:00",
      type: "training",
      eventType: "teacher",
      location: "Salle informatique",
      description: "Formation sur les outils numériques éducatifs",
      color: "#8b5cf6",
    },
    {
      id: "3",
      title: "Conseil de classe CM2 A",
      date: "2024-01-25",
      startTime: "18:00",
      endTime: "19:30",
      type: "meeting",
      eventType: "teacher",
      location: "Salle 201",
      description: "Conseil de classe du premier trimestre",
      color: "#10b981",
    },
    {
      id: "4",
      title: "Sortie pédagogique - Musée",
      date: "2024-01-26",
      startTime: "09:00",
      endTime: "16:00",
      type: "trip",
      eventType: "both",
      location: "Musée des Sciences",
      description: "Sortie avec les classes de CM1 et CM2",
      color: "#f59e0b",
    },
    {
      id: "5",
      title: "Réunion parents-professeurs",
      date: "2024-01-29",
      startTime: "17:00",
      endTime: "20:00",
      type: "parent_meeting",
      eventType: "both",
      location: "Salles de classe",
      description: "Rencontres individuelles avec les parents",
      color: "#ef4444",
    },
    {
      id: "6",
      title: "Surveillance examen",
      date: "2024-01-30",
      startTime: "10:00",
      endTime: "12:00",
      type: "exam",
      eventType: "teacher",
      location: "Salle polyvalente",
      description: "Surveillance de l'évaluation trimestrielle",
      color: "#06b6d4",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
      case "training":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
      case "trip":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
      case "parent_meeting":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
      case "exam":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "meeting":
        return "Réunion"
      case "training":
        return "Formation"
      case "trip":
        return "Sortie"
      case "parent_meeting":
        return "Rencontre parents"
      case "exam":
        return "Surveillance"
      default:
        return type
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="h-4 w-4" />
      case "training":
        return <BookOpen className="h-4 w-4" />
      case "trip":
        return <MapPin className="h-4 w-4" />
      case "parent_meeting":
        return <Users className="h-4 w-4" />
      case "exam":
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

  const filteredEvents = events.filter((event) => {
    if (filterType === "all") return true
    return event.type === filterType
  })

  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)

  const todayEvents = filteredEvents.filter((event) => {
    const today = new Date().toISOString().split("T")[0]
    return event.date === today
  })

  const eventStats = {
    total: filteredEvents.length,
    today: todayEvents.length,
    thisWeek: filteredEvents.filter((e) => {
      const eventDate = new Date(e.date)
      const now = new Date()
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
      const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6))
      return eventDate >= weekStart && eventDate <= weekEnd
    }).length,
    meetings: filteredEvents.filter((e) => e.type === "meeting").length,
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mon Calendrier</h1>
              <p className="text-gray-600 dark:text-gray-400">Consultez vos événements et activités pédagogiques</p>
            </div>
            <div className="flex space-x-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les événements</SelectItem>
                  <SelectItem value="meeting">Réunions</SelectItem>
                  <SelectItem value="training">Formations</SelectItem>
                  <SelectItem value="trip">Sorties</SelectItem>
                  <SelectItem value="parent_meeting">Rencontres parents</SelectItem>
                  <SelectItem value="exam">Surveillances</SelectItem>
                </SelectContent>
              </Select>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aujourd'hui</p>
                    <p className="text-2xl font-bold text-blue-600">{eventStats.today}</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cette semaine</p>
                    <p className="text-2xl font-bold text-green-600">{eventStats.thisWeek}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Réunions</p>
                    <p className="text-2xl font-bold text-purple-600">{eventStats.meetings}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar View */}
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
                      Consultez la liste des événements ci-contre pour voir votre planning
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Events */}
              {todayEvents.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Événements d'aujourd'hui
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {todayEvents.map((event) => (
                        <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              {getEventIcon(event.type)}
                              <h4 className="font-semibold text-sm">{event.title}</h4>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {getEventTypeLabel(event.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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
                      <div
                        key={event.id}
                        className="p-4 rounded-lg border-l-4"
                        style={{ borderLeftColor: event.color }}
                      >
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
                          <p className="font-medium text-gray-900 dark:text-gray-100">{formatDate(event.date)}</p>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatTime(event.startTime)} - {formatTime(event.endTime)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
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
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
