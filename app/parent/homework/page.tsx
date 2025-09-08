"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Calendar, Clock, CheckCircle, AlertCircle, User } from "lucide-react"
import { useState } from "react"

export default function ParentHomework() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data - will be replaced with real API calls
  const homework = [
    {
      id: "1",
      title: "Exercices de mathématiques - Chapitre 5",
      description: "Faire les exercices 1 à 10 page 45 du manuel",
      childName: "Emma Dubois",
      className: "CM2 A",
      subject: "Mathématiques",
      teacherName: "Prof. Martin",
      dueDate: "2024-01-18",
      estimatedDuration: 30,
      type: "exercise",
      status: "pending",
      assignedDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Lecture - Le Petit Prince",
      description: "Lire les chapitres 3 et 4, préparer un résumé",
      childName: "Emma Dubois",
      className: "CM2 A",
      subject: "Français",
      teacherName: "Mme Petit",
      dueDate: "2024-01-20",
      estimatedDuration: 45,
      type: "reading",
      status: "completed",
      assignedDate: "2024-01-16",
      completionDate: "2024-01-17",
    },
    {
      id: "3",
      title: "Recherche sur les animaux",
      description: "Choisir un animal et faire une fiche descriptive",
      childName: "Lucas Dubois",
      className: "CE2 B",
      subject: "Sciences",
      teacherName: "Mme Durand",
      dueDate: "2024-01-22",
      estimatedDuration: 60,
      type: "project",
      status: "pending",
      assignedDate: "2024-01-14",
    },
    {
      id: "4",
      title: "Tables de multiplication",
      description: "Apprendre les tables de 6 et 7",
      childName: "Lucas Dubois",
      className: "CE2 B",
      subject: "Mathématiques",
      teacherName: "Prof. Martin",
      dueDate: "2024-01-16",
      estimatedDuration: 20,
      type: "lesson",
      status: "late",
      assignedDate: "2024-01-12",
    },
  ]

  const filteredHomework = homework.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChild = selectedChild === "all" || item.childName === selectedChild
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesSearch && matchesChild && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "late":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "pending":
        return "En cours"
      case "late":
        return "En retard"
      default:
        return status
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exercise":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "reading":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "project":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "lesson":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
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

  const markAsCompleted = (homeworkId: string) => {
    console.log("[v0] Marking homework as completed:", homeworkId)
    // Here you would typically send the data to your API
  }

  const homeworkStats = {
    total: homework.length,
    completed: homework.filter((h) => h.status === "completed").length,
    pending: homework.filter((h) => h.status === "pending").length,
    late: homework.filter((h) => h.status === "late").length,
  }

  const children = [...new Set(homework.map((h) => h.childName))]

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Devoirs</h1>
            <p className="text-muted-foreground">Suivez les devoirs de vos enfants</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Terminés</p>
                    <p className="text-2xl font-bold text-green-600">{homeworkStats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">En cours</p>
                    <p className="text-2xl font-bold text-blue-600">{homeworkStats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">En retard</p>
                    <p className="text-2xl font-bold text-red-600">{homeworkStats.late}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
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
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les enfants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les enfants</SelectItem>
                    {children.map((child) => (
                      <SelectItem key={child} value={child}>
                        {child}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En cours</SelectItem>
                    <SelectItem value="completed">Terminés</SelectItem>
                    <SelectItem value="late">En retard</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedChild("all")
                    setSelectedStatus("all")
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
                            <Badge className={getStatusColor(item.status)}>{getStatusLabel(item.status)}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{item.childName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4" />
                              <span>
                                {item.subject} - {item.className}
                              </span>
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
                          <p className="text-xs text-muted-foreground mt-2">Professeur: {item.teacherName}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => markAsCompleted(item.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Marquer terminé
                            </Button>
                          )}
                          {item.status === "completed" && item.completionDate && (
                            <p className="text-xs text-green-600">
                              Terminé le {new Date(item.completionDate).toLocaleDateString("fr-FR")}
                            </p>
                          )}
                        </div>
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
                <p className="text-sm text-muted-foreground">Les devoirs de vos enfants apparaîtront ici</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
