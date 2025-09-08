"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, MessageSquare, Plus, Clock, AlertCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboard() {
  // Mock data - will be replaced with real API calls
  const stats = {
    totalStudents: 28,
    totalClasses: 2,
    pendingGrades: 5,
    unreadMessages: 3,
  }

  const recentActivities = [
    {
      id: 1,
      type: "grade",
      message: "Notes ajoutées pour le contrôle de mathématiques",
      time: "Il y a 2 heures",
      class: "CM2 A",
    },
    {
      id: 2,
      type: "absence",
      message: "Absence signalée pour Emma Dubois",
      time: "Il y a 4 heures",
      class: "CM2 A",
    },
    {
      id: 3,
      type: "message",
      message: "Nouveau message de Mme Martin",
      time: "Hier",
      class: "CM2 B",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      task: "Saisir les notes du contrôle de français",
      dueDate: "Aujourd'hui",
      priority: "high",
    },
    {
      id: 2,
      task: "Préparer le bulletin trimestriel",
      dueDate: "Dans 3 jours",
      priority: "medium",
    },
    {
      id: 3,
      task: "Réunion parents-professeurs",
      dueDate: "Vendredi",
      priority: "low",
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-4 md:py-8 px-4">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Tableau de bord - Professeur</h1>
            <p className="text-muted-foreground text-sm md:text-base">Gérez vos classes, notes et communications</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Élèves</CardTitle>
                <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Dans toutes vos classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Classes</CardTitle>
                <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">{stats.totalClasses}</div>
                <p className="text-xs text-muted-foreground">Classes assignées</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Notes en attente</CardTitle>
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-orange-600">{stats.pendingGrades}</div>
                <p className="text-xs text-muted-foreground">À saisir</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-blue-600">{stats.unreadMessages}</div>
                <p className="text-xs text-muted-foreground">Non lus</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            {/* Quick Actions */}
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <Link href="/teacher/grades/new">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <Plus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Ajouter des notes
                  </Button>
                </Link>
                <Link href="/teacher/absences/new">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <Calendar className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Signaler une absence
                  </Button>
                </Link>
                <Link href="/teacher/messages/new">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <MessageSquare className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Envoyer un message
                  </Button>
                </Link>
                <Link href="/teacher/classes">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <BookOpen className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Voir mes classes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-2 md:space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "grade" && (
                          <div className="bg-green-100 dark:bg-green-900 p-1.5 md:p-2 rounded-full">
                            <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                        {activity.type === "absence" && (
                          <div className="bg-orange-100 dark:bg-orange-900 p-1.5 md:p-2 rounded-full">
                            <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                        )}
                        {activity.type === "message" && (
                          <div className="bg-blue-100 dark:bg-blue-900 p-1.5 md:p-2 rounded-full">
                            <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-foreground">{activity.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {activity.class}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Tâches à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 md:space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 md:p-3 bg-muted rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-foreground truncate">{task.task}</p>
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
                        className="text-xs ml-2"
                      >
                        {task.priority === "high" ? "Urgent" : task.priority === "medium" ? "Moyen" : "Faible"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
