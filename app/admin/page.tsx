"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  GraduationCap,
  BookOpen,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Calendar,
  Settings,
  BarChart3,
  PieChart,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data - will be replaced with real API calls
  const stats = {
    totalUsers: 156,
    totalStudents: 128,
    totalTeachers: 12,
    totalParents: 85,
    totalClasses: 8,
    averageGrade: 14.2,
    attendanceRate: 92.5,
    unreadMessages: 7,
    pendingApprovals: 3,
  }

  const recentActivities = [
    {
      id: 1,
      type: "user_created",
      message: "Nouveau professeur ajouté: Mme Rousseau",
      time: "Il y a 2 heures",
      status: "success",
    },
    {
      id: 2,
      type: "grade_alert",
      message: "Alerte: Baisse des notes en CM1 B",
      time: "Il y a 4 heures",
      status: "warning",
    },
    {
      id: 3,
      type: "absence_alert",
      message: "Taux d'absence élevé en CE2 A",
      time: "Hier",
      status: "error",
    },
    {
      id: 4,
      type: "system",
      message: "Sauvegarde automatique effectuée",
      time: "Hier",
      status: "info",
    },
  ]

  const classPerformance = [
    { class: "CM2 A", students: 15, average: 15.8, attendance: 96 },
    { class: "CM2 B", students: 13, average: 14.2, attendance: 94 },
    { class: "CM1 A", students: 16, average: 13.9, attendance: 91 },
    { class: "CM1 B", students: 14, average: 12.8, attendance: 88 },
    { class: "CE2 A", students: 18, average: 14.5, attendance: 85 },
    { class: "CE2 B", students: 17, average: 15.1, attendance: 93 },
    { class: "CE1 A", students: 19, average: 13.7, attendance: 90 },
    { class: "CE1 B", students: 16, average: 14.3, attendance: 92 },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Valider l'inscription de 3 nouveaux élèves",
      priority: "high",
      dueDate: "Aujourd'hui",
    },
    {
      id: 2,
      task: "Réviser les paramètres de notation",
      priority: "medium",
      dueDate: "Cette semaine",
    },
    {
      id: 3,
      task: "Préparer le rapport trimestriel",
      priority: "low",
      dueDate: "Le mois prochain",
    },
  ]

  const getActivityIcon = (type: string, status: string) => {
    const iconClass = "h-4 w-4"
    switch (status) {
      case "success":
        return <CheckCircle className={`${iconClass} text-green-600`} />
      case "warning":
        return <AlertCircle className={`${iconClass} text-orange-600`} />
      case "error":
        return <AlertCircle className={`${iconClass} text-red-600`} />
      default:
        return <MessageSquare className={`${iconClass} text-blue-600`} />
    }
  }

  const getPerformanceColor = (average: number) => {
    if (average >= 15) return "text-green-600"
    if (average >= 12) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-black text-foreground mb-2">Tableau de bord</h1>
            <p className="text-lg text-muted-foreground">Vue d'ensemble de l'établissement scolaire</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Utilisateurs totaux</CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif font-black text-foreground">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.totalTeachers} professeurs, {stats.totalParents} parents
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Élèves</CardTitle>
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif font-black text-foreground">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground mt-1">Répartis en {stats.totalClasses} classes</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Moyenne générale</CardTitle>
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-chart-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif font-black text-primary">{stats.averageGrade}/20</div>
                <div className="flex items-center text-xs text-primary mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 ce mois
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Assiduité</CardTitle>
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif font-black text-secondary">{stats.attendanceRate}%</div>
                <div className="flex items-center text-xs text-destructive mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -1.2% ce mois
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground font-serif">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/users/new">
                  <Button
                    className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Ajouter un utilisateur
                  </Button>
                </Link>
                <Link href="/admin/classes/new">
                  <Button
                    className="w-full justify-start bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    size="lg"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Créer une classe
                  </Button>
                </Link>
                <Link href="/admin/news/new">
                  <Button
                    className="w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90"
                    size="lg"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Publier une actualité
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button className="w-full justify-start bg-transparent" variant="outline" size="lg">
                    <PieChart className="mr-2 h-4 w-4" />
                    Générer un rapport
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground font-serif">Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type, activity.status)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-card-foreground font-serif">
                  Tâches en attente
                  {stats.pendingApprovals > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {stats.pendingApprovals}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{task.task}</p>
                        <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                      </div>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {task.priority === "high" ? "Urgent" : task.priority === "medium" ? "Moyen" : "Faible"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class Performance Overview */}
          <Card className="mt-8 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground font-serif">Performance par classe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {classPerformance.map((cls) => (
                  <div
                    key={cls.class}
                    className="p-4 border border-border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-serif font-bold text-foreground">{cls.class}</h4>
                      <Badge variant="secondary">{cls.students} élèves</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Moyenne:</span>
                        <span className={`font-bold ${getPerformanceColor(cls.average)}`}>{cls.average}/20</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Assiduité:</span>
                        <span className={cls.attendance >= 90 ? "text-primary" : "text-destructive"}>
                          {cls.attendance}%
                        </span>
                      </div>
                      <Progress value={cls.attendance} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
