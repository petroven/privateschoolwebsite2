"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Minus, BookOpen, BarChart3 } from "lucide-react"
import { useState } from "react"

export default function ParentGrades() {
  const [selectedChild, setSelectedChild] = useState("1")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Mock data - will be replaced with real API calls
  const children = [
    { id: "1", name: "Emma Dubois", class: "CM2 A" },
    { id: "2", name: "Lucas Dubois", class: "CE2 B" },
  ]

  const grades = [
    {
      id: "1",
      childId: "1",
      subject: "Mathématiques",
      grade: 18,
      maxGrade: 20,
      type: "Contrôle",
      date: "2024-01-15",
      description: "Géométrie - Les triangles",
      teacher: "Prof. Martin",
      coefficient: 2,
    },
    {
      id: "2",
      childId: "1",
      subject: "Français",
      grade: 14,
      maxGrade: 20,
      type: "Devoir",
      date: "2024-01-14",
      description: "Dictée préparée",
      teacher: "Prof. Martin",
      coefficient: 1,
    },
    {
      id: "3",
      childId: "1",
      subject: "Sciences",
      grade: 16,
      maxGrade: 20,
      type: "Oral",
      date: "2024-01-13",
      description: "Le système solaire",
      teacher: "Prof. Martin",
      coefficient: 1,
    },
    {
      id: "4",
      childId: "2",
      subject: "Mathématiques",
      grade: 15,
      maxGrade: 20,
      type: "Contrôle",
      date: "2024-01-12",
      description: "Tables de multiplication",
      teacher: "Mme Petit",
      coefficient: 2,
    },
  ]

  const subjects = ["Mathématiques", "Français", "Sciences", "Histoire-Géo"]

  const filteredGrades = grades.filter((grade) => {
    const matchesChild = grade.childId === selectedChild
    const matchesSubject = selectedSubject === "all" || grade.subject === selectedSubject
    return matchesChild && matchesSubject
  })

  const selectedChildData = children.find((child) => child.id === selectedChild)

  // Calculate subject averages
  const subjectAverages = subjects
    .map((subject) => {
      const subjectGrades = filteredGrades.filter((g) => g.subject === subject)
      if (subjectGrades.length === 0) return { subject, average: null, count: 0 }

      const weightedSum = subjectGrades.reduce((sum, grade) => sum + grade.grade * grade.coefficient, 0)
      const totalCoeff = subjectGrades.reduce((sum, grade) => sum + grade.coefficient, 0)
      const average = totalCoeff > 0 ? weightedSum / totalCoeff : 0

      return { subject, average: Math.round(average * 100) / 100, count: subjectGrades.length }
    })
    .filter((avg) => avg.count > 0)

  const overallAverage =
    subjectAverages.length > 0
      ? Math.round((subjectAverages.reduce((sum, avg) => sum + avg.average, 0) / subjectAverages.length) * 100) / 100
      : 0

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getTrendIcon = (average: number) => {
    if (average >= 16) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (average >= 12) return <Minus className="h-4 w-4 text-orange-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notes et Évaluations</h1>
            <p className="text-gray-600">Consultez les résultats scolaires de vos enfants</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Enfant</label>
                  <Select value={selectedChild} onValueChange={setSelectedChild}>
                    <SelectTrigger>
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
                <div>
                  <label className="text-sm font-medium mb-2 block">Matière</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les matières" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les matières</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Overall Average */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Moyenne générale</p>
                    <p className={`text-2xl font-bold ${getGradeColor(overallAverage, 20)}`}>{overallAverage}/20</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Subject Averages */}
            {subjectAverages.slice(0, 3).map((subjectAvg) => (
              <Card key={subjectAvg.subject}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{subjectAvg.subject}</p>
                      <p className={`text-2xl font-bold ${getGradeColor(subjectAvg.average, 20)}`}>
                        {subjectAvg.average}/20
                      </p>
                      <p className="text-xs text-gray-500">{subjectAvg.count} note(s)</p>
                    </div>
                    {getTrendIcon(subjectAvg.average)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Détail des notes - {selectedChildData?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Coefficient</TableHead>
                    <TableHead>Professeur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell>{new Date(grade.date).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{grade.subject}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{grade.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{grade.description}</TableCell>
                        <TableCell>
                          <span className={`font-bold ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                            {grade.grade}/{grade.maxGrade}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">x{grade.coefficient}</Badge>
                        </TableCell>
                        <TableCell>{grade.teacher}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {filteredGrades.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune note trouvée pour ces critères</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
