"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TeacherGrades() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Mock data - will be replaced with real API calls
  const grades = [
    {
      id: "1",
      studentName: "Emma Dubois",
      class: "CM2 A",
      subject: "Mathématiques",
      grade: 16,
      maxGrade: 20,
      type: "Contrôle",
      date: "2024-01-15",
      description: "Géométrie - Les triangles",
    },
    {
      id: "2",
      studentName: "Lucas Martin",
      class: "CM2 A",
      subject: "Français",
      grade: 14,
      maxGrade: 20,
      type: "Devoir",
      date: "2024-01-14",
      description: "Dictée préparée",
    },
    {
      id: "3",
      studentName: "Sophie Durand",
      class: "CM2 B",
      subject: "Mathématiques",
      grade: 18,
      maxGrade: 20,
      type: "Oral",
      date: "2024-01-13",
      description: "Tables de multiplication",
    },
    {
      id: "4",
      studentName: "Thomas Petit",
      class: "CM2 B",
      subject: "Sciences",
      grade: 12,
      maxGrade: 20,
      type: "Contrôle",
      date: "2024-01-12",
      description: "Le cycle de l'eau",
    },
  ]

  const classes = ["CM2 A", "CM2 B"]
  const subjects = ["Mathématiques", "Français", "Sciences"]

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || grade.class === selectedClass
    const matchesSubject = selectedSubject === "all" || grade.subject === selectedSubject
    return matchesSearch && matchesClass && matchesSubject
  })

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gestion des Notes</h1>
              <p className="text-gray-600 dark:text-gray-400">Consultez et gérez les notes de vos élèves</p>
            </div>
            <Link href="/teacher/grades/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter des notes
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Rechercher un élève..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedClass("all")
                    setSelectedSubject("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle>Notes récentes ({filteredGrades.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">{grade.studentName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{grade.class}</Badge>
                      </TableCell>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getGradeColor(grade.grade, grade.maxGrade)}`}>
                          {grade.grade}/{grade.maxGrade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{grade.type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(grade.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell className="max-w-xs truncate">{grade.description}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredGrades.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">Aucune note trouvée avec ces critères</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
