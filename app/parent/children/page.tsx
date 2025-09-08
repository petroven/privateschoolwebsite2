"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { User, BookOpen, Calendar, Award, Clock, Mail } from "lucide-react"
import Link from "next/link"

export default function ParentChildren() {
  // Mock data - will be replaced with real API calls
  const children = [
    {
      id: "1",
      firstName: "Emma",
      lastName: "Dubois",
      dateOfBirth: "2012-03-15",
      class: "CM2 A",
      teacher: "Prof. Martin",
      teacherEmail: "prof.martin@sainte-marie.fr",
      averageGrade: 15.2,
      attendance: 95,
      subjects: [
        { name: "Mathématiques", average: 16.5, lastGrade: 18 },
        { name: "Français", average: 15.2, lastGrade: 14 },
        { name: "Sciences", average: 14.8, lastGrade: 16 },
        { name: "Histoire-Géo", average: 15.5, lastGrade: 15 },
      ],
      recentAchievements: ["Excellent travail en mathématiques", "Participation active en classe"],
    },
    {
      id: "2",
      firstName: "Lucas",
      lastName: "Dubois",
      dateOfBirth: "2014-07-22",
      class: "CE2 B",
      teacher: "Mme Petit",
      teacherEmail: "mme.petit@sainte-marie.fr",
      averageGrade: 13.8,
      attendance: 88,
      subjects: [
        { name: "Mathématiques", average: 14.2, lastGrade: 15 },
        { name: "Français", average: 13.5, lastGrade: 12 },
        { name: "Sciences", average: 13.8, lastGrade: 14 },
      ],
      recentAchievements: ["Progrès en lecture", "Bon esprit d'équipe"],
    },
  ]

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600"
    if (grade >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const getProgressColor = (grade: number) => {
    if (grade >= 16) return "bg-green-500"
    if (grade >= 12) return "bg-orange-500"
    return "bg-red-500"
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Enfants</h1>
            <p className="text-gray-600">Informations détaillées sur la scolarité de vos enfants</p>
          </div>

          <div className="space-y-8">
            {children.map((child) => (
              <Card key={child.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-blue-600 text-white text-lg">
                          {child.firstName[0]}
                          {child.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">
                          {child.firstName} {child.lastName}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-sm">
                            {child.class}
                          </Badge>
                          <span className="text-sm text-gray-600">{calculateAge(child.dateOfBirth)} ans</span>
                          <span className="text-sm text-gray-600">
                            Né(e) le {new Date(child.dateOfBirth).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{child.teacher}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${child.teacherEmail}`} className="text-sm text-blue-600 hover:underline">
                          {child.teacherEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Academic Performance */}
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Résultats scolaires
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-1">Moyenne générale</p>
                              <p className={`text-3xl font-bold ${getGradeColor(child.averageGrade)}`}>
                                {child.averageGrade}/20
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-1">Assiduité</p>
                              <p
                                className={`text-3xl font-bold ${child.attendance >= 95 ? "text-green-600" : child.attendance >= 85 ? "text-orange-600" : "text-red-600"}`}
                              >
                                {child.attendance}%
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Détail par matière</h4>
                        {child.subjects.map((subject) => (
                          <div key={subject.name} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{subject.name}</span>
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                  Dernière note:{" "}
                                  <span className={getGradeColor(subject.lastGrade)}>{subject.lastGrade}/20</span>
                                </span>
                                <span className={`font-bold ${getGradeColor(subject.average)}`}>
                                  {subject.average}/20
                                </span>
                              </div>
                            </div>
                            <Progress value={(subject.average / 20) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements and Actions */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Appréciations récentes
                      </h3>
                      <div className="space-y-3 mb-6">
                        {child.recentAchievements.map((achievement, index) => (
                          <div key={index} className="p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                            <p className="text-sm text-green-800">{achievement}</p>
                          </div>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                      <div className="space-y-3">
                        <Link href={`/parent/grades?child=${child.id}`}>
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Voir toutes les notes
                          </Button>
                        </Link>
                        <Link href={`/parent/absences?child=${child.id}`}>
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Consulter les absences
                          </Button>
                        </Link>
                        <Link href={`/parent/messages/new?teacher=${child.teacherEmail}`}>
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <Mail className="mr-2 h-4 w-4" />
                            Contacter le professeur
                          </Button>
                        </Link>
                        <Link href={`/parent/schedule?child=${child.id}`}>
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <Clock className="mr-2 h-4 w-4" />
                            Emploi du temps
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
