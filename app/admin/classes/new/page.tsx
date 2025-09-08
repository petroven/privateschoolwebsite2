"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, GraduationCap, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewClass() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    capacity: "",
    teacherId: "",
    room: "",
    description: "",
    isActive: true,
    subjects: [] as string[],
    schedule: {
      monday: { start: "08:30", end: "16:30" },
      tuesday: { start: "08:30", end: "16:30" },
      wednesday: { start: "08:30", end: "12:00" },
      thursday: { start: "08:30", end: "16:30" },
      friday: { start: "08:30", end: "16:30" },
    },
  })

  // Mock data
  const availableTeachers = [
    { id: "1", name: "Pierre Martin" },
    { id: "2", name: "Anne Petit" },
    { id: "3", name: "Sophie Rousseau" },
    { id: "4", name: "Marc Durand" },
  ]

  const availableSubjects = [
    "Français",
    "Mathématiques",
    "Histoire-Géographie",
    "Sciences",
    "Anglais",
    "Arts plastiques",
    "Musique",
    "Éducation physique",
    "Instruction civique",
  ]

  const classLevels = ["CP", "CE1", "CE2", "CM1", "CM2"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Creating class:", formData)
      router.push("/admin/classes")
    } catch (error) {
      console.error("Error creating class:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }))
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/classes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouvelle Classe</h1>
              <p className="text-gray-600">Créer une nouvelle classe</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Informations générales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom de la classe *</Label>
                        <Input
                          id="name"
                          placeholder="ex: CM2 A"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="level">Niveau *</Label>
                        <Select
                          value={formData.level}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            {classLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Capacité maximale</Label>
                        <Input
                          id="capacity"
                          type="number"
                          placeholder="25"
                          value={formData.capacity}
                          onChange={(e) => setFormData((prev) => ({ ...prev, capacity: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="room">Salle de classe</Label>
                        <Input
                          id="room"
                          placeholder="ex: Salle 12"
                          value={formData.room}
                          onChange={(e) => setFormData((prev) => ({ ...prev, room: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="teacherId">Professeur principal</Label>
                      <Select
                        value={formData.teacherId}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, teacherId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un professeur" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTeachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Description de la classe..."
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Matières enseignées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableSubjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={formData.subjects.includes(subject)}
                            onCheckedChange={() => handleSubjectToggle(subject)}
                          />
                          <Label htmlFor={subject} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Emploi du temps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(formData.schedule).map(([day, times]) => (
                        <div key={day} className="grid grid-cols-3 gap-4 items-center">
                          <Label className="capitalize">
                            {day === "monday"
                              ? "Lundi"
                              : day === "tuesday"
                                ? "Mardi"
                                : day === "wednesday"
                                  ? "Mercredi"
                                  : day === "thursday"
                                    ? "Jeudi"
                                    : "Vendredi"}
                          </Label>
                          <Input
                            type="time"
                            value={times.start}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                schedule: {
                                  ...prev.schedule,
                                  [day]: { ...times, start: e.target.value },
                                },
                              }))
                            }
                          />
                          <Input
                            type="time"
                            value={times.end}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                schedule: {
                                  ...prev.schedule,
                                  [day]: { ...times, end: e.target.value },
                                },
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: !!checked }))}
                      />
                      <Label htmlFor="isActive">Classe active</Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={isLoading} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Création..." : "Créer la classe"}
                  </Button>
                  <Link href="/admin/classes">
                    <Button variant="outline" className="w-full bg-transparent">
                      Annuler
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  )
}
