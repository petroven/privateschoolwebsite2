"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface StudentGrade {
  studentId: string
  studentName: string
  grade: string
  absent: boolean
}

export default function NewGrades() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [gradeType, setGradeType] = useState("")
  const [maxGrade, setMaxGrade] = useState("20")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>([])

  // Mock data - will be replaced with real API calls
  const classes = [
    { id: "1", name: "CM2 A" },
    { id: "2", name: "CM2 B" },
  ]

  const subjects = [
    { id: "1", name: "Mathématiques" },
    { id: "2", name: "Français" },
    { id: "3", name: "Sciences" },
    { id: "4", name: "Histoire-Géographie" },
  ]

  const gradeTypes = ["Contrôle", "Devoir", "Oral", "Exercice", "Projet", "Participation"]

  const mockStudents = [
    { id: "1", name: "Emma Dubois" },
    { id: "2", name: "Lucas Martin" },
    { id: "3", name: "Sophie Durand" },
    { id: "4", name: "Thomas Petit" },
    { id: "5", name: "Marie Leroy" },
    { id: "6", name: "Antoine Bernard" },
  ]

  const handleClassChange = (classId: string) => {
    setSelectedClass(classId)
    // Initialize student grades when class is selected
    const initialGrades = mockStudents.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      grade: "",
      absent: false,
    }))
    setStudentGrades(initialGrades)
  }

  const updateStudentGrade = (studentId: string, grade: string) => {
    setStudentGrades((prev) => prev.map((sg) => (sg.studentId === studentId ? { ...sg, grade } : sg)))
  }

  const toggleStudentAbsent = (studentId: string) => {
    setStudentGrades((prev) =>
      prev.map((sg) =>
        sg.studentId === studentId ? { ...sg, absent: !sg.absent, grade: sg.absent ? sg.grade : "" } : sg,
      ),
    )
  }

  const handleSave = () => {
    // Here you would save the grades to your database
    console.log("[v0] Saving grades:", {
      class: selectedClass,
      subject: selectedSubject,
      type: gradeType,
      maxGrade,
      description,
      date,
      grades: studentGrades.filter((sg) => sg.grade || sg.absent),
    })
    // Redirect back to grades list
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/teacher/grades">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ajouter des Notes</h1>
              <p className="text-gray-600 dark:text-gray-400">Saisissez les notes pour vos élèves</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Grade Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration de l'évaluation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Classe *</Label>
                    <Select value={selectedClass} onValueChange={handleClassChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Matière *</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Type d'évaluation *</Label>
                    <Select value={gradeType} onValueChange={setGradeType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'évaluation" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxGrade">Note sur *</Label>
                    <Input
                      id="maxGrade"
                      type="number"
                      value={maxGrade}
                      onChange={(e) => setMaxGrade(e.target.value)}
                      placeholder="20"
                      min="1"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Contrôle sur les fractions, Dictée préparée..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Student Grades */}
            {selectedClass && (
              <Card>
                <CardHeader>
                  <CardTitle>Saisie des notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentGrades.map((student) => (
                      <div key={student.studentId} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{student.studentName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`absent-${student.studentId}`}
                              checked={student.absent}
                              onCheckedChange={() => toggleStudentAbsent(student.studentId)}
                            />
                            <Label htmlFor={`absent-${student.studentId}`} className="text-sm">
                              Absent
                            </Label>
                          </div>
                          <div className="w-24">
                            <Input
                              type="number"
                              value={student.grade}
                              onChange={(e) => updateStudentGrade(student.studentId, e.target.value)}
                              placeholder="Note"
                              disabled={student.absent}
                              min="0"
                              max={maxGrade}
                              step="0.5"
                            />
                          </div>
                          <span className="text-gray-500">/ {maxGrade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            {selectedClass && (
              <div className="flex justify-end gap-4">
                <Link href="/teacher/grades">
                  <Button variant="outline">Annuler</Button>
                </Link>
                <Button
                  onClick={handleSave}
                  disabled={!selectedClass || !selectedSubject || !gradeType}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les notes
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
