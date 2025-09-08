"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, BookOpen, User, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function ParentSchedule() {
  const [selectedChild, setSelectedChild] = useState("1")
  const [currentWeek, setCurrentWeek] = useState(0) // 0 = current week, -1 = previous, +1 = next

  // Mock data - replace with actual API calls
  const children = [
    { id: "1", name: "Emma Dubois", class: "CM2 A" },
    { id: "2", name: "Lucas Dubois", class: "CE2 B" },
  ]

  const scheduleData = {
    "1": {
      // Emma's schedule
      monday: [
        { time: "08:30-09:30", subject: "Mathématiques", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "09:30-10:30", subject: "Français", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "10:30-10:45", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "10:45-11:45", subject: "Histoire-Géographie", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "11:45-12:45", subject: "Sciences", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "12:45-13:45", subject: "Déjeuner", teacher: "", room: "Cantine" },
        { time: "13:45-14:45", subject: "Anglais", teacher: "Mme Johnson", room: "Salle 8" },
        { time: "14:45-15:45", subject: "Arts plastiques", teacher: "Mme Dubois", room: "Atelier" },
        { time: "15:45-16:00", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "16:00-16:30", subject: "Étude dirigée", teacher: "Prof. Martin", room: "Salle 12" },
      ],
      tuesday: [
        { time: "08:30-09:30", subject: "Français", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "09:30-10:30", subject: "Mathématiques", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "10:30-10:45", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "10:45-11:45", subject: "Éducation physique", teacher: "M. Durand", room: "Gymnase" },
        { time: "11:45-12:45", subject: "Sciences", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "12:45-13:45", subject: "Déjeuner", teacher: "", room: "Cantine" },
        { time: "13:45-14:45", subject: "Musique", teacher: "Mme Petit", room: "Salle de musique" },
        { time: "14:45-15:45", subject: "Français", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "15:45-16:00", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "16:00-16:30", subject: "Mathématiques", teacher: "Prof. Martin", room: "Salle 12" },
      ],
      wednesday: [
        { time: "08:30-09:30", subject: "Mathématiques", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "09:30-10:30", subject: "Français", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "10:30-10:45", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "10:45-11:45", subject: "Sciences", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "11:45-12:00", subject: "Sortie", teacher: "", room: "" },
      ],
      thursday: [
        { time: "08:30-09:30", subject: "Histoire-Géographie", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "09:30-10:30", subject: "Mathématiques", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "10:30-10:45", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "10:45-11:45", subject: "Français", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "11:45-12:45", subject: "Anglais", teacher: "Mme Johnson", room: "Salle 8" },
        { time: "12:45-13:45", subject: "Déjeuner", teacher: "", room: "Cantine" },
        { time: "13:45-14:45", subject: "Éducation physique", teacher: "M. Durand", room: "Gymnase" },
        { time: "14:45-15:45", subject: "Arts plastiques", teacher: "Mme Dubois", room: "Atelier" },
        { time: "15:45-16:00", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "16:00-16:30", subject: "Sciences", teacher: "Prof. Martin", room: "Salle 12" },
      ],
      friday: [
        { time: "08:30-09:30", subject: "Français", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "09:30-10:30", subject: "Mathématiques", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "10:30-10:45", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "10:45-11:45", subject: "Histoire-Géographie", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "11:45-12:45", subject: "Musique", teacher: "Mme Petit", room: "Salle de musique" },
        { time: "12:45-13:45", subject: "Déjeuner", teacher: "", room: "Cantine" },
        { time: "13:45-14:45", subject: "Sciences", teacher: "Prof. Martin", room: "Salle 12" },
        { time: "14:45-15:45", subject: "Anglais", teacher: "Mme Johnson", room: "Salle 8" },
        { time: "15:45-16:00", subject: "Récréation", teacher: "", room: "Cour" },
        { time: "16:00-16:30", subject: "Étude dirigée", teacher: "Prof. Martin", room: "Salle 12" },
      ],
    },
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]

  const getWeekDates = (weekOffset: number) => {
    const today = new Date()
    const currentDay = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - currentDay + 1 + weekOffset * 7)

    const dates = []
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  const getSubjectColor = (subject: string) => {
    const colors = {
      Mathématiques: "bg-blue-100 text-blue-800 border-blue-200",
      Français: "bg-green-100 text-green-800 border-green-200",
      Sciences: "bg-purple-100 text-purple-800 border-purple-200",
      "Histoire-Géographie": "bg-orange-100 text-orange-800 border-orange-200",
      Anglais: "bg-red-100 text-red-800 border-red-200",
      "Arts plastiques": "bg-pink-100 text-pink-800 border-pink-200",
      Musique: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Éducation physique": "bg-indigo-100 text-indigo-800 border-indigo-200",
      Récréation: "bg-gray-100 text-gray-600 border-gray-200",
      Déjeuner: "bg-gray-100 text-gray-600 border-gray-200",
      "Étude dirigée": "bg-teal-100 text-teal-800 border-teal-200",
    }
    return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const selectedChildData = children.find((child) => child.id === selectedChild)
  const schedule = scheduleData[selectedChild as keyof typeof scheduleData] || {}

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Emploi du Temps</h1>
            <p className="text-gray-600">Consultez l'emploi du temps de vos enfants</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Enfant</label>
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name} - {child.class}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                <ChevronLeft className="h-4 w-4" />
                Semaine précédente
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(0)} disabled={currentWeek === 0}>
                Semaine actuelle
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                Semaine suivante
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Schedule Header */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Semaine du {weekDates[0].toLocaleDateString("fr-FR")} au {weekDates[4].toLocaleDateString("fr-FR")}
              </CardTitle>
              {selectedChildData && (
                <p className="text-gray-600">
                  {selectedChildData.name} - {selectedChildData.class}
                </p>
              )}
            </CardHeader>
          </Card>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {days.map((day, dayIndex) => (
              <Card key={day} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-3">
                  <CardTitle className="text-center">
                    <div className="text-lg font-semibold">{dayNames[dayIndex]}</div>
                    <div className="text-sm text-gray-600 font-normal">
                      {weekDates[dayIndex].toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="space-y-2">
                    {schedule[day]?.map((slot, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${getSubjectColor(slot.subject)} transition-all hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs font-medium">{slot.time}</span>
                        </div>
                        <div className="font-semibold text-sm mb-1">{slot.subject}</div>
                        {slot.teacher && (
                          <div className="flex items-center gap-1 text-xs">
                            <User className="h-3 w-3" />
                            <span>{slot.teacher}</span>
                          </div>
                        )}
                        {slot.room && (
                          <div className="flex items-center gap-1 text-xs">
                            <BookOpen className="h-3 w-3" />
                            <span>{slot.room}</span>
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Pas de cours</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Légende des matières</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  "Mathématiques",
                  "Français",
                  "Sciences",
                  "Histoire-Géographie",
                  "Anglais",
                  "Arts plastiques",
                  "Musique",
                  "Éducation physique",
                  "Étude dirigée",
                ].map((subject) => (
                  <div key={subject} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded border ${getSubjectColor(subject)}`} />
                    <span className="text-sm">{subject}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
