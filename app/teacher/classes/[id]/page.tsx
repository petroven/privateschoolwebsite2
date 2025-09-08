"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
  Plus,
  Edit,
  FileText,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ClassDetail() {
  const params = useParams()
  const classId = params.id as string

  // Mock data - replace with actual API calls
  const classData = {
    id: classId,
    name: "CM2 A",
    level: "CM2",
    capacity: 25,
    currentStudents: 23,
    room: "Salle 12",
    teacher: "Pierre Martin",
    subjects: ["Français", "Mathématiques", "Histoire-Géographie", "Sciences"],
    schedule: {
      monday: "08:30 - 16:30",
      tuesday: "08:30 - 16:30",
      wednesday: "08:30 - 12:00",
      thursday: "08:30 - 16:30",
      friday: "08:30 - 16:30",
    },
  }

  const students = [
    {
      id: "1",
      firstName: "Emma",
      lastName: "Dubois",
      average: 15.2,
      attendance: 96,
      lastGrade: { subject: "Mathématiques", grade: 16, date: "2024-01-15" },
      parentEmail: "durand@example.fr",
      parentPhone: "06 12 34 56 78",
    },
    {
      id: "2",
      firstName: "Lucas",
      lastName: "Martin",
      average: 13.8,
      attendance: 92,
      lastGrade: { subject: "Français", grade: 14, date: "2024-01-14" },
      parentEmail: "martin@example.fr",
      parentPhone: "06 98 76 54 32",
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Durand",
      average: 16.1,
      attendance: 98,
      lastGrade: { subject: "Sciences", grade: 17, date: "2024-01-15" },
      parentEmail: "petit@example.fr",
      parentPhone: "06 11 22 33 44",
    },
  ]

  const recentGrades = [
    { id: "1", student: "Emma Dubois", subject: "Mathématiques", grade: 16, date: "2024-01-15", type: "Contrôle" },
    { id: "2", student: "Lucas Martin", subject: "Français", grade: 14, date: "2024-01-14", type: "Exercice" },
    { id: "3", student: "Sophie Durand", subject: "Sciences", grade: 17, date: "2024-01-15", type: "Exposé" },
  ]

  const upcomingEvents = [
    { id: "1", title: "Contrôle de mathématiques", date: "2024-01-18", type: "Évaluation" },
    { id: "2", title: "Sortie au musée", date: "2024-01-22", type: "Sortie" },
    { id: "3", title: "Réunion parents-professeurs", date: "2024-01-25", type: "Réunion" },
  ]

  const classStats = {
    averageGrade: students.reduce((sum, student) => sum + student.average, 0) / students.length,
    averageAttendance: students.reduce((sum, student) => sum + student.attendance, 0) / students.length,
    totalAbsences: 12,
    pendingGrades: 5,
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 15) return "text-green-600"
    if (grade >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return "text-green-600"
    if (attendance >= 90) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/teacher/classes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux classes
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Classe {classData.name}</h1>
              <p className="text-gray-600">
                {classData.currentStudents}/{classData.capacity} élèves • {classData.room}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
              <Link href="/teacher/grades/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter des notes
                </Button>
              </Link>
            </div>
          </div>

          {/* Class Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{classStats.averageGrade.toFixed(1)}/20</div>
                <p className="text-xs text-muted-foreground">+0.3 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assiduité</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{classStats.averageAttendance.toFixed(0)}%</div>
                <p className="text-xs text-muted-foreground">{classStats.totalAbsences} absences ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Élèves</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classData.currentStudents}</div>
                <Progress value={(classData.currentStudents / classData.capacity) * 100} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notes en attente</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{classStats.pendingGrades}</div>
                <p className="text-xs text-muted-foreground">À saisir</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="students" className="space-y-6">
            <TabsList>
              <TabsTrigger value="students">Élèves</TabsTrigger>
              <TabsTrigger value="grades">Notes récentes</TabsTrigger>
              <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
              <TabsTrigger value="events">Événements</TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Liste des élèves ({students.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {student.firstName} {student.lastName}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {student.parentEmail}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {student.parentPhone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <p className="text-gray-600">Moyenne</p>
                            <p className={`font-bold ${getGradeColor(student.average)}`}>{student.average}/20</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Assiduité</p>
                            <p className={`font-bold ${getAttendanceColor(student.attendance)}`}>
                              {student.attendance}%
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Dernière note</p>
                            <p className="font-medium">
                              {student.lastGrade.grade}/20 en {student.lastGrade.subject}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Notes récentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentGrades.map((grade) => (
                      <div key={grade.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{grade.student}</p>
                          <p className="text-sm text-gray-600">
                            {grade.subject} • {grade.type}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{new Date(grade.date).toLocaleDateString("fr-FR")}</Badge>
                          <span className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>{grade.grade}/20</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Emploi du temps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(classData.schedule).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium capitalize">
                          {day === "monday"
                            ? "Lundi"
                            : day === "tuesday"
                              ? "Mardi"
                              : day === "wednesday"
                                ? "Mercredi"
                                : day === "thursday"
                                  ? "Jeudi"
                                  : "Vendredi"}
                        </span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Matières enseignées</h4>
                    <div className="flex flex-wrap gap-2">
                      {classData.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Événements à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.type}</p>
                        </div>
                        <Badge variant="outline">{new Date(event.date).toLocaleDateString("fr-FR")}</Badge>
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
