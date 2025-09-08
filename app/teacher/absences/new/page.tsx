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
import { ArrowLeft, Save, UserX, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewAbsence() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    date: "",
    startTime: "",
    endTime: "",
    isFullDay: false,
    reason: "",
    isJustified: false,
    notifyParents: true,
    notes: "",
  })

  // Mock data - replace with actual API calls
  const students = [
    { id: "1", name: "Emma Dubois", class: "CM2 A" },
    { id: "2", name: "Lucas Martin", class: "CM2 A" },
    { id: "3", name: "Sophie Durand", class: "CM2 A" },
    { id: "4", name: "Thomas Rousseau", class: "CM2 B" },
    { id: "5", name: "Marie Petit", class: "CM2 B" },
  ]

  const absenceReasons = ["Maladie", "Rendez-vous médical", "Problème familial", "Voyage", "Autre"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Creating absence:", formData)
      router.push("/teacher/absences")
    } catch (error) {
      console.error("Error creating absence:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFullDayToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isFullDay: checked,
      startTime: checked ? "" : prev.startTime,
      endTime: checked ? "" : prev.endTime,
    }))
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/teacher/absences">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Signaler une Absence</h1>
              <p className="text-gray-600">Enregistrer l'absence d'un élève</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserX className="h-5 w-5" />
                      Informations de l'absence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="studentId">Élève *</Label>
                      <Select
                        value={formData.studentId}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, studentId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un élève" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} - {student.class}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reason">Motif</Label>
                        <Select
                          value={formData.reason}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un motif" />
                          </SelectTrigger>
                          <SelectContent>
                            {absenceReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="isFullDay" checked={formData.isFullDay} onCheckedChange={handleFullDayToggle} />
                      <Label htmlFor="isFullDay">Absence toute la journée</Label>
                    </div>

                    {!formData.isFullDay && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime">Heure de début</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">Heure de fin</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="notes">Notes complémentaires</Label>
                      <Textarea
                        id="notes"
                        placeholder="Informations supplémentaires sur l'absence..."
                        value={formData.notes}
                        onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isJustified"
                        checked={formData.isJustified}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isJustified: !!checked }))}
                      />
                      <Label htmlFor="isJustified">Absence justifiée</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifyParents"
                        checked={formData.notifyParents}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifyParents: !!checked }))}
                      />
                      <Label htmlFor="notifyParents">Notifier les parents</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Rappel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• Les absences doivent être signalées le jour même</p>
                      <p>• Les parents seront automatiquement notifiés si l'option est cochée</p>
                      <p>• Une justification peut être demandée pour les absences répétées</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={isLoading} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Enregistrement..." : "Enregistrer l'absence"}
                  </Button>
                  <Link href="/teacher/absences">
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
