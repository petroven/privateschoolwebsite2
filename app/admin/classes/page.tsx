"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Edit, Trash2, Users, BookOpen, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminClasses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Mock data - will be replaced with real API calls
  const classes = [
    {
      id: "1",
      name: "CM2 A",
      level: "CM2",
      academicYear: "2024-2025",
      teacherId: "2",
      teacherName: "Pierre Martin",
      studentCount: 15,
      maxCapacity: 20,
      schedule: "Lundi, Mercredi, Vendredi - 8h30-12h00",
      subjects: ["Mathématiques", "Français", "Sciences", "Histoire-Géo"],
      classroom: "Salle 101",
      averageGrade: 15.8,
      attendanceRate: 96,
    },
    {
      id: "2",
      name: "CM2 B",
      level: "CM2",
      academicYear: "2024-2025",
      teacherId: "4",
      teacherName: "Anne Petit",
      studentCount: 13,
      maxCapacity: 20,
      schedule: "Mardi, Jeudi - 8h30-12h00",
      subjects: ["Mathématiques", "Français", "Sciences"],
      classroom: "Salle 102",
      averageGrade: 14.2,
      attendanceRate: 94,
    },
    {
      id: "3",
      name: "CM1 A",
      level: "CM1",
      academicYear: "2024-2025",
      teacherId: "5",
      teacherName: "Marie Rousseau",
      studentCount: 16,
      maxCapacity: 18,
      schedule: "Lundi, Mercredi, Vendredi - 13h30-17h00",
      subjects: ["Mathématiques", "Français", "Sciences"],
      classroom: "Salle 201",
      averageGrade: 13.9,
      attendanceRate: 91,
    },
    {
      id: "4",
      name: "CE2 A",
      level: "CE2",
      academicYear: "2024-2025",
      teacherId: null,
      teacherName: null,
      studentCount: 18,
      maxCapacity: 20,
      schedule: "À définir",
      subjects: ["Mathématiques", "Français"],
      classroom: "Salle 203",
      averageGrade: 14.5,
      attendanceRate: 85,
    },
  ]

  const levels = ["CP", "CE1", "CE2", "CM1", "CM2"]

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || cls.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-orange-600"
    return "text-green-600"
  }

  const getPerformanceColor = (grade: number) => {
    if (grade >= 15) return "text-green-600"
    if (grade >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const classStats = {
    total: classes.length,
    withTeacher: classes.filter((c) => c.teacherId).length,
    totalStudents: classes.reduce((sum, c) => sum + c.studentCount, 0),
    averageSize: Math.round(classes.reduce((sum, c) => sum + c.studentCount, 0) / classes.length),
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Classes</h1>
              <p className="text-gray-600">Organisez et gérez les classes de votre établissement</p>
            </div>
            <Link href="/admin/classes/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle classe
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Classes totales</p>
                    <p className="text-2xl font-bold">{classStats.total}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avec professeur</p>
                    <p className="text-2xl font-bold text-green-600">{classStats.withTeacher}</p>
                  </div>
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Élèves totaux</p>
                    <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taille moyenne</p>
                    <p className="text-2xl font-bold">{classStats.averageSize}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher une classe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedLevel("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{cls.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{cls.level}</Badge>
                        <Badge variant="outline">{cls.academicYear}</Badge>
                        <Badge variant="outline">{cls.classroom}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/admin/classes/${cls.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Teacher Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    {cls.teacherName ? (
                      <>
                        <Avatar>
                          <AvatarFallback>
                            {cls.teacherName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{cls.teacherName}</p>
                          <p className="text-sm text-gray-500">Professeur principal</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 text-orange-600">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">Aucun professeur assigné</span>
                      </div>
                    )}
                  </div>

                  {/* Class Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Effectif</p>
                      <p className={`text-lg font-bold ${getCapacityColor(cls.studentCount, cls.maxCapacity)}`}>
                        {cls.studentCount}/{cls.maxCapacity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Moyenne</p>
                      <p className={`text-lg font-bold ${getPerformanceColor(cls.averageGrade)}`}>
                        {cls.averageGrade}/20
                      </p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Matières enseignées:</p>
                    <div className="flex flex-wrap gap-2">
                      {cls.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="p-3 bg-gray-50 rounded-lg mb-4">
                    <p className="text-sm font-medium text-gray-700">Emploi du temps</p>
                    <p className="text-sm text-gray-600">{cls.schedule}</p>
                  </div>

                  {/* Performance Indicator */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Assiduité:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${cls.attendanceRate >= 90 ? "bg-green-500" : cls.attendanceRate >= 80 ? "bg-orange-500" : "bg-red-500"}`}
                          style={{ width: `${cls.attendanceRate}%` }}
                        />
                      </div>
                      <span className="font-medium">{cls.attendanceRate}%</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <Link href={`/admin/classes/${cls.id}/students`}>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Users className="mr-2 h-4 w-4" />
                        Élèves
                      </Button>
                    </Link>
                    <Link href={`/admin/classes/${cls.id}/schedule`}>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Calendar className="mr-2 h-4 w-4" />
                        Planning
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Aucune classe trouvée</p>
                <p className="text-sm text-gray-400">Créez votre première classe pour commencer</p>
                <Link href="/admin/classes/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une classe
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
