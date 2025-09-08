"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Plus, Search, Calendar, Clock, Users, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TeacherHomework() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Mock data - will be replaced with real API calls
  const homework = [
    {
      id: "1",
      title: "Exercices de mathématiques - Chapitre 5",
      description: "Faire les exercices 1 à 10 page 45 du manuel",
      className: "CM2 A",
      subject: "Mathématiques",
      dueDate: "2024-01-18",
      estimatedDuration: 30,
      type: "exercise",
      isPublished: true,
      completionRate: 85,
      totalStudents: 26,
      completedStudents: 22,
    },
    {
      id: "2",
      title: "Lecture - Le Petit Prince",
      description: "Lire les chapitres 3 et 4, préparer un résumé",
      className: "CM2 A",
      subject: "Français",
      dueDate: "2024-01-20",
      estimatedDuration: 45,
      type: "reading",
      isPublished: true,
      completionRate: 65,
      totalStudents: 26,
      completedStudents: 17,
    },
    {
      id: "3",
      title: "Projet sciences - Les volcans",
      description: "Rechercher des informations sur les volcans français",
      className: "CM2 B",
      subject: "Sciences",
      dueDate: "2024-01-25",
      estimatedDuration: 120,
      type: "project",
      isPublished: false,
      completionRate: 0,
      totalStudents: 24,
      completedStudents: 0,
    },
  ]

  const filteredHomework = homework.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || item.className === selectedClass
    const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject
    return matchesSearch && matchesClass && matchesSubject
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exercise":
        return "bg-blue-100 text-blue-800"
      case "reading":
        return "bg-green-100 text-green-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      case "lesson":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "exercise":
        return "Exercice"
      case "reading":
        return "Lecture"
      case "project":
        return "Projet"
      case "lesson":
        return "Leçon"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })
  }

  const getDaysUntilDue = (dateString: string) => {
    const dueDate = new Date(dateString)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const homeworkStats = {
    total: homework.length,
    published: homework.filter((h) => h.isPublished).length,
    draft: homework.filter((h) => !h.isPublished).length,
    avgCompletion: Math.round(homework.reduce((sum, h) => sum + h.completionRate, 0) / homework.length),
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Cahier de Texte</h1>
              <p className="text-muted-foreground">Gérez les devoirs et travaux de vos élèves</p>
            </div>
            <Link href="/teacher/homework/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau devoir
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total devoirs</p>
                    <p className="text-2xl font-bold">{homeworkStats.total}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Publiés</p>
                    <p className="text-2xl font-bold text-green-600">{homeworkStats.published}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Brouillons</p>
                    <p className="text-2xl font-bold text-orange-600">{homeworkStats.draft}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux moyen</p>
                    <p className="text-2xl font-bold text-blue-600">{homeworkStats.avgCompletion}%</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un devoir..."
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
                    <SelectItem value="CM2 A">CM2 A</SelectItem>
                    <SelectItem value="CM2 B">CM2 B</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les matières" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les matières</SelectItem>
                    <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                    <SelectItem value="Français">Français</SelectItem>
                    <SelectItem value="Sciences">Sciences</SelectItem>
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

          {/* Homework List */}
          <div className="space-y-6">
            {filteredHomework
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .map((item) => {
                const daysUntilDue = getDaysUntilDue(item.dueDate)
                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            <Badge className={getTypeColor(item.type)}>{getTypeLabel(item.type)}</Badge>
                            <Badge variant={item.isPublished ? "default" : "secondary"}>
                              {item.isPublished ? "Publié" : "Brouillon"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{item.className}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4" />
                              <span>{item.subject}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {formatDate(item.dueDate)}
                                {daysUntilDue === 0 && <span className="text-red-600 ml-1">(Aujourd'hui)</span>}
                                {daysUntilDue === 1 && <span className="text-orange-600 ml-1">(Demain)</span>}
                                {daysUntilDue > 1 && <span className="ml-1">(dans {daysUntilDue} jours)</span>}
                                {daysUntilDue < 0 && <span className="text-red-600 ml-1">(En retard)</span>}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{item.estimatedDuration} min</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {item.completedStudents}/{item.totalStudents} élèves
                            </p>
                            <p className="text-xs text-muted-foreground">{item.completionRate}% terminé</p>
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/teacher/homework/${item.id}/edit`}>
                              <Button variant="outline" size="sm">
                                Modifier
                              </Button>
                            </Link>
                            <Link href={`/teacher/homework/${item.id}/submissions`}>
                              <Button variant="outline" size="sm">
                                Voir les rendus
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.completionRate}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>

          {filteredHomework.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Aucun devoir trouvé</p>
                <p className="text-sm text-muted-foreground">Créez votre premier devoir pour vos élèves</p>
                <Link href="/teacher/homework/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer un devoir
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
