"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, Search, Send, Clock, Users, AlertTriangle, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminNotifications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data - will be replaced with real API calls
  const notifications = [
    {
      id: "1",
      title: "Fermeture exceptionnelle demain",
      message: "L'école sera fermée demain en raison des conditions météorologiques",
      type: "emergency",
      typeLabel: "Urgence",
      priority: "urgent",
      targetAudience: "all",
      isSent: true,
      sentAt: "2024-01-15T08:00:00",
      recipientCount: 156,
      readCount: 142,
      createdAt: "2024-01-14T18:30:00",
      senderName: "Direction",
    },
    {
      id: "2",
      title: "Réunion parents-professeurs",
      message: "N'oubliez pas la réunion parents-professeurs de jeudi prochain",
      type: "reminder",
      typeLabel: "Rappel",
      priority: "normal",
      targetAudience: "parents",
      isSent: true,
      sentAt: "2024-01-12T14:00:00",
      recipientCount: 89,
      readCount: 76,
      createdAt: "2024-01-12T13:45:00",
      senderName: "Secrétariat",
    },
    {
      id: "3",
      title: "Nouvelles notes disponibles",
      message: "Les notes du contrôle de mathématiques sont disponibles",
      type: "grade",
      typeLabel: "Notes",
      priority: "normal",
      targetAudience: "parents",
      isSent: false,
      scheduledAt: "2024-01-16T16:00:00",
      recipientCount: 26,
      readCount: 0,
      createdAt: "2024-01-15T10:20:00",
      senderName: "Prof. Martin",
    },
    {
      id: "4",
      title: "Sortie au musée confirmée",
      message: "La sortie au Musée des Sciences est confirmée pour vendredi",
      type: "event",
      typeLabel: "Événement",
      priority: "normal",
      targetAudience: "all",
      isSent: true,
      sentAt: "2024-01-10T09:15:00",
      recipientCount: 156,
      readCount: 148,
      createdAt: "2024-01-10T09:00:00",
      senderName: "Direction",
    },
  ]

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || notif.type === selectedType
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "sent" && notif.isSent) ||
      (selectedStatus === "scheduled" && !notif.isSent)
    return matchesSearch && matchesType && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Urgent"
      case "high":
        return "Élevée"
      case "normal":
        return "Normale"
      case "low":
        return "Faible"
      default:
        return priority
    }
  }

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case "all":
        return "Tous"
      case "teachers":
        return "Professeurs"
      case "parents":
        return "Parents"
      case "students":
        return "Élèves"
      default:
        return audience
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const notificationStats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.isSent).length,
    scheduled: notifications.filter((n) => !n.isSent).length,
    totalRecipients: notifications.reduce((sum, n) => sum + n.recipientCount, 0),
    avgReadRate: Math.round(
      notifications.filter((n) => n.isSent).reduce((sum, n) => sum + (n.readCount / n.recipientCount) * 100, 0) /
        notifications.filter((n) => n.isSent).length,
    ),
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
              <p className="text-muted-foreground">Gérez les notifications push de votre établissement</p>
            </div>
            <Link href="/admin/notifications/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle notification
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{notificationStats.total}</p>
                  </div>
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Envoyées</p>
                    <p className="text-2xl font-bold text-green-600">{notificationStats.sent}</p>
                  </div>
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Programmées</p>
                    <p className="text-2xl font-bold text-orange-600">{notificationStats.scheduled}</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Destinataires</p>
                    <p className="text-2xl font-bold text-blue-600">{notificationStats.totalRecipients}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux de lecture</p>
                    <p className="text-2xl font-bold text-purple-600">{notificationStats.avgReadRate}%</p>
                  </div>
                  <Eye className="h-8 w-8 text-muted-foreground" />
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
                    placeholder="Rechercher une notification..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="emergency">Urgence</SelectItem>
                    <SelectItem value="announcement">Annonce</SelectItem>
                    <SelectItem value="reminder">Rappel</SelectItem>
                    <SelectItem value="event">Événement</SelectItem>
                    <SelectItem value="grade">Notes</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="sent">Envoyées</SelectItem>
                    <SelectItem value="scheduled">Programmées</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                    setSelectedStatus("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-6">
            {filteredNotifications
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{notification.title}</h3>
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority === "urgent" && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {getPriorityLabel(notification.priority)}
                          </Badge>
                          <Badge variant="outline">{notification.typeLabel}</Badge>
                          <Badge variant="secondary">{getAudienceLabel(notification.targetAudience)}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{notification.message}</p>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{notification.recipientCount} destinataires</span>
                          </div>
                          {notification.isSent ? (
                            <>
                              <div className="flex items-center space-x-2">
                                <Send className="h-4 w-4" />
                                <span>Envoyée le {formatDate(notification.sentAt!)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Eye className="h-4 w-4" />
                                <span>
                                  {notification.readCount} lues (
                                  {Math.round((notification.readCount / notification.recipientCount) * 100)}%)
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Programmée pour le{" "}
                                {notification.scheduledAt ? formatDate(notification.scheduledAt) : "Non programmée"}
                              </span>
                            </div>
                          )}
                          <span>Par {notification.senderName}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/admin/notifications/${notification.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </Link>
                        <Link href={`/admin/notifications/${notification.id}/stats`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        {!notification.isSent && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Send className="mr-2 h-4 w-4" />
                            Envoyer
                          </Button>
                        )}
                      </div>
                    </div>
                    {notification.isSent && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(notification.readCount / notification.recipientCount) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Aucune notification trouvée</p>
                <p className="text-sm text-muted-foreground">
                  Créez votre première notification pour informer votre communauté
                </p>
                <Link href="/admin/notifications/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une notification
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
