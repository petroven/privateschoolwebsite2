"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  BookOpen,
  Filter,
  GraduationCap,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

export default function ParentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState("month")
  const [filterType, setFilterType] = useState("all")
  const [selectedChild, setSelectedChild] = useState("all")

  // Mock data - will be replaced with real API calls
  // Only events relevant to students (event_type = 'student' or 'both')
  const children = [
    { id: "1", name: "Emma Martin", class: "CM2 A" },
    { id: "2", name: "Lucas Martin", class: "CE1 B" },
  ]

  const events = [
    {
      id: "1",
      title: "Sortie au Musée des Sciences",
      date: "2024-01-25",
      startTime: "09:00",
      endTime: "16:00",
      type: "trip",
      eventType: "student",
      location: "Musée des Sciences",
      description: "Visite pédagogique pour les classes de CM1 et CM2",
      color: "#10b981",
      classes: ["CM1 A", "CM2 A"],
      childrenConcerned: ["Emma Martin"],
    },
    {
      id: "2",
      title: "Contrôle de mathématiques",
      date: "2024-01-24",
      startTime: "10:00",
      endTime: "11:00",
      type: "exam",
      eventType: "student",
      location: "Salle 201",
      description: "Évaluation sur les fractions et les nombres décimaux",
      color: "#ef4444",
      classes: ["CM2 A"],
      childrenConcerned: ["Emma Martin"],
    },
    {
      id: "3",
      title: "Spectacle de fin d'année",
      date: "2024-01-26",
      startTime: "18:00",
      endTime: "20:00",
      type: "event",
      eventType: "both",
      location: "Salle polyvalente",
      description: "Représentation théâtrale des élèves",
      color: "#8b5cf6",
      classes: ["Toutes classes"],
      childrenConcerned: ["Emma Martin", "Lucas Martin"],
    },
    {
      id: "4",
      title: "Réunion parents-professeurs",
      date: "2024-01-29",
      startTime: "17:00",
      endTime: "20:00",
      type: "parent_meeting",
      eventType: "both",
      location: "Salles de classe",
      description: "Rencontres individuelles avec les enseignants",
      color: "#f59e0b",
      classes: ["Toutes classes"],
      childrenConcerned: ["Emma Martin", "Lucas Martin"],
    },
    {
      id: "5",
      title: "Vacances d'hiver",
      date: "2024-02-10",
      startTime: "",
      endTime: "",
      type: "holiday",
      eventType: "student",
      location: "",
      description: "Vacances scolaires d'hiver - 2 semaines",
      color: "#06b6d4",
      classes: ["Toutes classes"],
      childrenConcerned: ["Emma Martin", "Lucas Martin"],
      isAllDay: true,
    },
    {
      id: "6",
      title: "Évaluation de français",
      date: "2024-01-23",
      startTime: "14:00",
      endTime: "15:00",
      type: "exam",
      eventType: "student",
      location: "Salle 105",
      description: "Dictée et compréhension de texte",
      color: "#ef4444",
      classes: ["CE1 B"],
      childrenConcerned: ["Lucas Martin"],
    },
    {
      id: "7",
      title: "Atelier cuisine",
      date: "2024-01-27",
      startTime: "15:00",
      endTime: "16:30",
      type: "activity",
      eventType: "student",
      location: "Salle d'activités",
      description: "Atelier pédagogique de cuisine pour les CE1",
      color: "#10b981",
      classes: ["CE1 B"],
      childrenConcerned: ["Lucas Martin"],
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
      case "trip":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
      case "parent_meeting":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
      case "holiday":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800"
      case "activity":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "exam":
        return "Évaluation"
      case "trip":
        return "Sortie"
      case "event":
        return "Événement"
      case "parent_meeting":
        return "Rencontre parents"
      case "holiday":
        return "Vacances"
      case "activity":
        return "Activité"
      default:
        return type
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <BookOpen className="h-4 w-4" />
      case "trip":
        return <MapPin className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "parent_meeting":
        return <GraduationCap className="h-4 w-4" />
      case "holiday":
        return <Calendar className="h-4 w-4" />
      case "activity":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const formatTime = (time: string) => {
    return time ? time.slice(0, 5) : ""
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
    const typeMatch = filterType === "all" || event.type === filterType
    const childMatch =
      selectedChild === "all" ||
      event.childrenConcerned.includes(children.find((c) => c.id === selectedChild)?.name || "")
    return typeMatch && childMatch
  })

  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)

  const todayEvents = filteredEvents.filter((event) => {
    const today = new Date().toISOString().split("T")[0]
    return event.date === today
  })

  const urgentEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return eventDate <= tomorrow && eventDate >= new Date() && event.type === "exam"
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
    exams: filteredEvents.filter((e) => e.type === "exam").length,
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calendrier Scolaire</h1>
              <p className="text-gray-600 dark:text-gray-400">Suivez les événements et activités de vos enfants</p>
            </div>
            <div className="flex space-x-2">
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger className="w-40">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les enfants</SelectItem>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les événements</SelectItem>
                  <SelectItem value="exam">Évaluations</SelectItem>
                  <SelectItem value="trip">Sorties</SelectItem>
                  <SelectItem value="event">Événements</SelectItem>
                  <SelectItem value="parent_meeting">Rencontres parents</SelectItem>
                  <SelectItem value="holiday">Vacances</SelectItem>
                  <SelectItem value="activity">Activités</SelectItem>
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

          {/* Urgent Events Alert */}
          {urgentEvents.length > 0 && (
            <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200">Évaluations à venir</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {urgentEvents.length} évaluation{urgentEvents.length > 1 ? "s" : ""} prévue
                      {urgentEvents.length > 1 ? "s" : ""} dans les prochaines 24h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                  <GraduationCap className="h-8 w-8 text-gray-400 dark:text-gray-500" />
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
                      Consultez la liste des événements ci-contre pour voir le planning de vos enfants
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
                            {!event.isAllDay && (
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                </span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {event.childrenConcerned.map((child, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {child}
                              </Badge>
                            ))}
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
                          {!event.isAllDay && (
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                              </span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {event.childrenConcerned.map((child, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {child}
                              </Badge>
                            ))}
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
