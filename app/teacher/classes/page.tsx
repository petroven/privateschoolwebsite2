"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, BookOpen, Calendar, Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function TeacherClasses() {
  // Mock data - will be replaced with real API calls
  const classes = [
    {
      id: "1",
      name: "CM2 A",
      level: "CM2",
      studentCount: 15,
      subjects: ["Mathématiques", "Français", "Sciences"],
      schedule: "Lundi, Mercredi, Vendredi - 8h30-12h00",
    },
    {
      id: "2",
      name: "CM2 B",
      level: "CM2",
      studentCount: 13,
      subjects: ["Mathématiques", "Français"],
      schedule: "Mardi, Jeudi - 8h30-12h00",
    },
  ]

  const recentStudents = [
    { id: "1", name: "Emma Dubois", class: "CM2 A", lastGrade: "16/20", status: "present" },
    { id: "2", name: "Lucas Martin", class: "CM2 A", lastGrade: "14/20", status: "absent" },
    { id: "3", name: "Sophie Durand", class: "CM2 B", lastGrade: "18/20", status: "present" },
    { id: "4", name: "Thomas Petit", class: "CM2 B", lastGrade: "12/20", status: "present" },
  ]

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Classes</h1>
              <p className="text-gray-600">Gérez vos classes et suivez vos élèves</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle classe
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Classes List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {classes.map((classItem) => (
                  <Card key={classItem.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{classItem.name}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {classItem.level}
                          </Badge>
                        </div>
                        <Link href={`/teacher/classes/${classItem.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{classItem.studentCount} élèves</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{classItem.subjects.length} matières</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Emploi du temps</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Matières enseignées :</p>
                        <div className="flex flex-wrap gap-2">
                          {classItem.subjects.map((subject) => (
                            <Badge key={subject} variant="outline">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{classItem.schedule}</p>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Link href={`/teacher/grades?class=${classItem.id}`}>
                          <Button variant="outline" size="sm">
                            Voir les notes
                          </Button>
                        </Link>
                        <Link href={`/teacher/absences?class=${classItem.id}`}>
                          <Button variant="outline" size="sm">
                            Gérer absences
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Students Activity */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente des élèves</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentStudents.map((student) => (
                      <div key={student.id} className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {student.class}
                            </Badge>
                            <span className="text-xs text-gray-500">Dernière note: {student.lastGrade}</span>
                          </div>
                        </div>
                        <Badge variant={student.status === "present" ? "default" : "destructive"}>
                          {student.status === "present" ? "Présent" : "Absent"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/teacher/grades/new">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter des notes
                    </Button>
                  </Link>
                  <Link href="/teacher/absences/new">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Signaler absence
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
