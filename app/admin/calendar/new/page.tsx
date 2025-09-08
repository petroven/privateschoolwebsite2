"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, Save, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function NewCalendarEvent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "event"

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    eventType: "both" as "teacher" | "student" | "both",
    category: defaultType as "meeting" | "exam" | "holiday" | "event" | "course" | "parent_meeting",
    location: "",
    classId: "",
    subjectId: "",
    isAllDay: false,
    isRecurring: false,
    recurrencePattern: "weekly" as "daily" | "weekly" | "monthly" | "yearly",
    recurrenceEndDate: "",
    color: "#3b82f6",
    participants: [] as string[],
  })

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])

  // Mock data - will be replaced with real API calls
  const classes = [
    { id: "1", name: "CP A", level: "CP" },
    { id: "2", name: "CE1 B", level: "CE1" },
    { id: "3", name: "CE2 A", level: "CE2" },
    { id: "4", name: "CM1 A", level: "CM1" },
    { id: "5", name: "CM2 B", level: "CM2" },
  ]

  const subjects = [
    { id: "1", name: "Mathématiques", code: "MATH" },
    { id: "2", name: "Français", code: "FR" },
    { id: "3", name: "Sciences", code: "SCI" },
    { id: "4", name: "Histoire-Géographie", code: "HG" },
    { id: "5", name: "Arts plastiques", code: "ART" },
  ]

  const teachers = [
    { id: "1", name: "Marie Dubois", subject: "Mathématiques" },
    { id: "2", name: "Pierre Martin", subject: "Français" },
    { id: "3", name: "Sophie Laurent", subject: "Sciences" },
    { id: "4", name: "Jean Moreau", subject: "Histoire" },
  ]

  const eventColors = [
    { value: "#3b82f6", label: "Bleu", class: "bg-blue-500" },
    { value: "#ef4444", label: "Rouge", class: "bg-red-500" },
    { value: "#10b981", label: "Vert", class: "bg-green-500" },
    { value: "#f59e0b", label: "Orange", class: "bg-amber-500" },
    { value: "#8b5cf6", label: "Violet", class: "bg-violet-500" },
    { value: "#06b6d4", label: "Cyan", class: "bg-cyan-500" },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addParticipant = (participantId: string, participantName: string) => {
    if (!selectedParticipants.includes(participantId)) {
      setSelectedParticipants((prev) => [...prev, participantId])
      setFormData((prev) => ({
        ...prev,
        participants: [...prev.participants, participantName],
      }))
    }
  }

  const removeParticipant = (participantId: string, participantName: string) => {
    setSelectedParticipants((prev) => prev.filter((id) => id !== participantId))
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((name) => name !== participantName),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title || !formData.startDate || (!formData.isAllDay && !formData.startTime)) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Mock API call
    console.log("Creating event:", formData)

    // Simulate success
    alert("Événement créé avec succès!")
    router.push("/admin/calendar")
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "meeting":
        return "Réunion"
      case "exam":
        return "Évaluation"
      case "holiday":
        return "Vacances"
      case "event":
        return "Événement"
      case "course":
        return "Cours"
      case "parent_meeting":
        return "Rencontre parents"
      default:
        return category
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/calendar">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Nouvel événement</h1>
              <p className="text-gray-600 dark:text-gray-400">Créez un nouvel événement dans le calendrier scolaire</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Informations générales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre de l'événement *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Ex: Réunion parents-professeurs"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Décrivez l'événement..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Type d'événement</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meeting">Réunion</SelectItem>
                            <SelectItem value="exam">Évaluation</SelectItem>
                            <SelectItem value="holiday">Vacances</SelectItem>
                            <SelectItem value="event">Événement</SelectItem>
                            <SelectItem value="course">Cours</SelectItem>
                            <SelectItem value="parent_meeting">Rencontre parents</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="eventType">Audience</Label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(value) => handleInputChange("eventType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="both">Professeurs et Étudiants</SelectItem>
                            <SelectItem value="teacher">Professeurs uniquement</SelectItem>
                            <SelectItem value="student">Étudiants uniquement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Lieu</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Ex: Salle polyvalente"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Date et heure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isAllDay"
                        checked={formData.isAllDay}
                        onCheckedChange={(checked) => handleInputChange("isAllDay", checked)}
                      />
                      <Label htmlFor="isAllDay">Événement toute la journée</Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Date de début *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">Date de fin</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange("endDate", e.target.value)}
                        />
                      </div>
                    </div>

                    {!formData.isAllDay && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime">Heure de début</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => handleInputChange("startTime", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">Heure de fin</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => handleInputChange("endTime", e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isRecurring"
                        checked={formData.isRecurring}
                        onCheckedChange={(checked) => handleInputChange("isRecurring", checked)}
                      />
                      <Label htmlFor="isRecurring">Événement récurrent</Label>
                    </div>

                    {formData.isRecurring && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="recurrencePattern">Fréquence</Label>
                          <Select
                            value={formData.recurrencePattern}
                            onValueChange={(value) => handleInputChange("recurrencePattern", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Quotidien</SelectItem>
                              <SelectItem value="weekly">Hebdomadaire</SelectItem>
                              <SelectItem value="monthly">Mensuel</SelectItem>
                              <SelectItem value="yearly">Annuel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="recurrenceEndDate">Fin de récurrence</Label>
                          <Input
                            id="recurrenceEndDate"
                            type="date"
                            value={formData.recurrenceEndDate}
                            onChange={(e) => handleInputChange("recurrenceEndDate", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {(formData.category === "course" || formData.category === "exam") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Détails pédagogiques
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="classId">Classe</Label>
                          <Select
                            value={formData.classId}
                            onValueChange={(value) => handleInputChange("classId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une classe" />
                            </SelectTrigger>
                            <SelectContent>
                              {classes.map((cls) => (
                                <SelectItem key={cls.id} value={cls.id}>
                                  {cls.name} ({cls.level})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="subjectId">Matière</Label>
                          <Select
                            value={formData.subjectId}
                            onValueChange={(value) => handleInputChange("subjectId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une matière" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject.id} value={subject.id}>
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Participants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Professeurs</Label>
                      <div className="space-y-2 mt-2">
                        {teachers.map((teacher) => (
                          <div key={teacher.id} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{teacher.name}</span>
                            {selectedParticipants.includes(teacher.id) ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeParticipant(teacher.id, teacher.name)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addParticipant(teacher.id, teacher.name)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.participants.length > 0 && (
                      <div>
                        <Label>Participants sélectionnés</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.participants.map((participant, index) => (
                            <Badge key={index} variant="secondary">
                              {participant}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Apparence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label>Couleur de l'événement</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {eventColors.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            className={`w-full h-10 rounded border-2 ${color.class} ${
                              formData.color === color.value ? "border-gray-900 dark:border-white" : "border-gray-200"
                            }`}
                            onClick={() => handleInputChange("color", color.value)}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`p-4 rounded-lg border-l-4`} style={{ borderLeftColor: formData.color }}>
                      <h4 className="font-semibold text-sm mb-2">{formData.title || "Titre de l'événement"}</h4>
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{formData.startDate || "Date à définir"}</span>
                        </div>
                        {!formData.isAllDay && formData.startTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formData.startTime} - {formData.endTime || "..."}
                            </span>
                          </div>
                        )}
                        {formData.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{formData.location}</span>
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs mt-2">
                          {getCategoryLabel(formData.category)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/admin/calendar">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                Créer l'événement
              </Button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  )
}
