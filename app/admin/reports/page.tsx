"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Users,
  BookOpen,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("current_term")
  const [selectedReport, setSelectedReport] = useState("overview")

  // Mock data - will be replaced with real API calls
  const reportData = {
    overview: {
      totalStudents: 128,
      totalTeachers: 12,
      totalClasses: 8,
      averageGrade: 14.2,
      attendanceRate: 92.5,
      parentEngagement: 87.3,
    },
    gradeDistribution: [
      { range: "18-20", count: 15, percentage: 12 },
      { range: "16-18", count: 32, percentage: 25 },
      { range: "14-16", count: 45, percentage: 35 },
      { range: "12-14", count: 25, percentage: 20 },
      { range: "10-12", count: 8, percentage: 6 },
      { range: "0-10", count: 3, percentage: 2 },
    ],
    classPerformance: [
      { class: "CM2 A", students: 15, average: 15.8, attendance: 96, trend: "up" },
      { class: "CM2 B", students: 13, average: 14.2, attendance: 94, trend: "stable" },
      { class: "CM1 A", students: 16, average: 13.9, attendance: 91, trend: "down" },
      { class: "CM1 B", students: 14, average: 12.8, attendance: 88, trend: "down" },
      { class: "CE2 A", students: 18, average: 14.5, attendance: 85, trend: "up" },
      { class: "CE2 B", students: 17, average: 15.1, attendance: 93, trend: "up" },
      { class: "CE1 A", students: 19, average: 13.7, attendance: 90, trend: "stable" },
      { class: "CE1 B", students: 16, average: 14.3, attendance: 92, trend: "up" },
    ],
    subjectPerformance: [
      { subject: "Mathématiques", average: 14.8, improvement: 0.3 },
      { subject: "Français", average: 14.1, improvement: -0.1 },
      { subject: "Sciences", average: 13.9, improvement: 0.5 },
      { subject: "Histoire-Géo", average: 14.5, improvement: 0.2 },
      { subject: "Anglais", average: 13.2, improvement: -0.3 },
    ],
    attendanceIssues: [
      { student: "Lucas Martin", class: "CM2 A", absences: 8, rate: 85 },
      { student: "Emma Petit", class: "CE2 A", absences: 12, rate: 78 },
      { student: "Thomas Durand", class: "CM1 B", absences: 6, rate: 88 },
    ],
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getPerformanceColor = (average: number) => {
    if (average >= 15) return "text-green-600"
    if (average >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const generateReport = () => {
    // Generate and download report logic
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`)
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapports et Statistiques</h1>
              <p className="text-gray-600">Analysez les performances et tendances de votre établissement</p>
            </div>
            <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Exporter le rapport
            </Button>
          </div>

          {/* Report Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Paramètres du rapport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Période</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current_term">Trimestre actuel</SelectItem>
                      <SelectItem value="last_term">Trimestre précédent</SelectItem>
                      <SelectItem value="current_year">Année scolaire</SelectItem>
                      <SelectItem value="last_year">Année précédente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Type de rapport</label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Vue d'ensemble</SelectItem>
                      <SelectItem value="academic">Performance académique</SelectItem>
                      <SelectItem value="attendance">Assiduité</SelectItem>
                      <SelectItem value="behavior">Comportement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Élèves</p>
                    <p className="text-2xl font-bold">{reportData.overview.totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Professeurs</p>
                    <p className="text-2xl font-bold">{reportData.overview.totalTeachers}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Moyenne</p>
                    <p className="text-2xl font-bold text-green-600">{reportData.overview.averageGrade}/20</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assiduité</p>
                    <p className="text-2xl font-bold text-green-600">{reportData.overview.attendanceRate}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement</p>
                    <p className="text-2xl font-bold text-blue-600">{reportData.overview.parentEngagement}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Classes</p>
                    <p className="text-2xl font-bold">{reportData.overview.totalClasses}</p>
                  </div>
                  <PieChart className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.gradeDistribution.map((grade) => (
                    <div key={grade.range} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-12">{grade.range}</span>
                        <Progress value={grade.percentage} className="w-32 h-2" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{grade.count} élèves</span>
                        <Badge variant="secondary">{grade.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance par matière</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{subject.subject}</p>
                        <p className={`text-sm ${getPerformanceColor(subject.average)}`}>
                          Moyenne: {subject.average}/20
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {subject.improvement > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : subject.improvement < 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <div className="h-4 w-4" />
                        )}
                        <span
                          className={`text-sm ${subject.improvement > 0 ? "text-green-600" : subject.improvement < 0 ? "text-red-600" : "text-gray-600"}`}
                        >
                          {subject.improvement > 0 ? "+" : ""}
                          {subject.improvement}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Class Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance par classe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.classPerformance.map((cls) => (
                    <div key={cls.class} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{cls.class}</span>
                          <Badge variant="secondary">{cls.students} élèves</Badge>
                          {getTrendIcon(cls.trend)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm">
                          <span className={getPerformanceColor(cls.average)}>Moy: {cls.average}/20</span>
                          <span className={cls.attendance >= 90 ? "text-green-600" : "text-orange-600"}>
                            Ass: {cls.attendance}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attendance Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Problèmes d'assiduité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.attendanceIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium">{issue.student}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Badge variant="outline">{issue.class}</Badge>
                          <span>{issue.absences} absences</span>
                        </div>
                      </div>
                      <Badge variant="destructive">{issue.rate}%</Badge>
                    </div>
                  ))}
                </div>
                {reportData.attendanceIssues.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun problème d'assiduité détecté</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
