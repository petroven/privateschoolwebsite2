"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Award,
  Mail,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ChildDetail() {
  const params = useParams()
  const childId = params.id as string

  // Mock data - replace with actual API calls
  const child = {
    id: childId,
    firstName: "Emma",
    lastName: "Dubois",
    dateOfBirth: "2012-03-15",
    class: "CM2 A",
    teacher: "Prof. Martin",
    teacherEmail: "prof.martin@sainte-marie.fr",
    averageGrade: 15.2,
    attendance: 95,
    photo: null,
  }

  const subjects = [
    { name: "Mathématiques", average: 16.5, coefficient: 3, trend: "up" },
    { name: "Français", average: 15.2, coefficient: 3, trend: "stable" },
    { name: "Sciences", average: 14.8, coefficient: 2, trend: "up" },
    { name: "Histoire-Géographie", average: 15.5, coefficient: 2, trend: "down" },
    { name: "Anglais", average: 13.8, coefficient: 2, trend: "up" },
    { name: "Arts plastiques", average: 16.8, coefficient: 1, trend: "stable" },
    { name: "Éducation physique", average: 15.0, coefficient: 1, trend: "up" },
  ]

  const recentGrades = [
    { id: "1", subject: "Mathématiques", grade: 18, date: "2024-01-15", type: "Contrôle", coefficient: 2 },
    { id: "2", subject: "Français", grade: 14, date: "2024-01-14", type: "Dictée", coefficient: 1 },
    { id: "3", subject: "Sciences", grade: 16, date: "2024-01-12", type: "Exposé", coefficient: 2 },
    { id: "4", subject: "Histoire-Géographie", grade: 15, date: "2024-01-10", type: "Leçon", coefficient: 1 },
  ]

  const absences = [
    { id: "1", date: "2024-01-08", reason: "Maladie", justified: true, duration: "Journée complète" },
    { id: "2", date: "2023-12-15", reason: "Rendez-vous médical", justified: true, duration: "Après-midi" },
  ]

  const homework = [
    {
      id: "1",
      subject: "Mathématiques",
      title: "Exercices page 45-46",
      dueDate: "2024-01-18",
      status: "pending",
      description: "Faire les exercices 1 à 5 page 45 et 46",
    },
    {
      id: "2",
      subject: "Français",
      title: "Lecture chapitre 3",
      dueDate: "2024-01-19",
      status: "completed",
      description: "Lire le chapitre 3 et répondre aux questions",
    },
    {
      id: "3",
      subject: "Sciences",
      title: "Recherche sur les volcans",
      dueDate: "2024-01-22",
      status: "pending",
      description: "Préparer un exposé de 5 minutes sur les volcans",
    },
  ]

  const achievements = [
    { id: "1", title: "Excellent travail en mathématiques", date: "2024-01-15", type: "academic" },
    { id: "2", title: "Participation active en classe", date: "2024-01-10", type: "behavior" },
    { id: "3", title: "Aide aux camarades", date: "2024-01-05", type: "social" },
  ]

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600"
    if (grade >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/parent/children">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {child.firstName} {child.lastName}
              </h1>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{child.class}</Badge>
                <span className="text-gray-600">{calculateAge(child.dateOfBirth)} ans</span>
                <span className="text-gray-600">{child.teacher}</span>
              </div>
            </div>
            <Link href={`/parent/messages/new?teacher=${child.teacherEmail}`}>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Contacter le professeur
              </Button>
            </Link>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getGradeColor(child.averageGrade)}`}>{child.averageGrade}/20</div>
                <p className="text-xs text-muted-foreground">+0.5 ce trimestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assiduité</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{child.attendance}%</div>
                <p className="text-xs text-muted-foreground">{absences.length} absences cette année</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Devoirs</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {homework.filter((h) => h.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">En cours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appréciations</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{achievements.length}</div>
                <p className="text-xs text-muted-foreground">Ce trimestre</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="grades" className="space-y-6">
            <TabsList>
              <TabsTrigger value="grades">Notes</TabsTrigger>
              <TabsTrigger value="absences">Absences</TabsTrigger>
              <TabsTrigger value="homework">Devoirs</TabsTrigger>
              <TabsTrigger value="achievements">Appréciations</TabsTrigger>
            </TabsList>

            <TabsContent value="grades">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subject Averages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Moyennes par matière</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subjects.map((subject) => (
                        <div key={subject.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{subject.name}</span>
                              {getTrendIcon(subject.trend)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                Coef. {subject.coefficient}
                              </Badge>
                              <span className={`font-bold ${getGradeColor(subject.average)}`}>
                                {subject.average}/20
                              </span>
                            </div>
                          </div>
                          <Progress value={(subject.average / 20) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Grades */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notes récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentGrades.map((grade) => (
                        <div key={grade.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{grade.subject}</p>
                            <p className="text-xs text-gray-600">
                              {grade.type} • {new Date(grade.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              Coef. {grade.coefficient}
                            </Badge>
                            <span className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>{grade.grade}/20</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="absences">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des absences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {absences.map((absence) => (
                      <div key={absence.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {absence.justified ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <p className="font-medium">{new Date(absence.date).toLocaleDateString("fr-FR")}</p>
                            <p className="text-sm text-gray-600">{absence.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{absence.reason}</p>
                          <Badge variant={absence.justified ? "default" : "destructive"}>
                            {absence.justified ? "Justifiée" : "Non justifiée"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {absences.length === 0 && (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <p className="text-gray-500">Aucune absence enregistrée</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="homework">
              <Card>
                <CardHeader>
                  <CardTitle>Devoirs et travaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {homework.map((hw) => (
                      <div key={hw.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{hw.subject}</Badge>
                            <h4 className="font-medium">{hw.title}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={hw.status === "completed" ? "default" : "destructive"}>
                              {hw.status === "completed" ? "Terminé" : "En cours"}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              Échéance: {new Date(hw.dueDate).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{hw.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Appréciations et réussites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-green-600" />
                            <h4 className="font-medium text-green-800">{achievement.title}</h4>
                          </div>
                          <Badge
                            variant={
                              achievement.type === "academic"
                                ? "default"
                                : achievement.type === "behavior"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {achievement.type === "academic"
                              ? "Scolaire"
                              : achievement.type === "behavior"
                                ? "Comportement"
                                : "Social"}
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700">
                          {new Date(achievement.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}
