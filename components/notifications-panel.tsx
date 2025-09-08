"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, X, AlertTriangle, MessageSquare, Calendar, BookOpen, Award } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  priority: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
  actionLabel?: string
}

export function NotificationsPanel() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock data - will be replaced with real API calls
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Fermeture exceptionnelle demain",
        message: "L'école sera fermée demain en raison des conditions météorologiques",
        type: "emergency",
        priority: "urgent",
        isRead: false,
        createdAt: "2024-01-15T08:00:00",
      },
      {
        id: "2",
        title: "Nouvelles notes disponibles",
        message: "Les notes du contrôle de mathématiques sont disponibles",
        type: "grade",
        priority: "normal",
        isRead: false,
        createdAt: "2024-01-14T16:30:00",
        actionUrl: "/parent/grades",
        actionLabel: "Voir les notes",
      },
      {
        id: "3",
        title: "Nouveau message reçu",
        message: "Vous avez reçu un nouveau message de Prof. Martin",
        type: "message",
        priority: "normal",
        isRead: true,
        createdAt: "2024-01-14T14:20:00",
        actionUrl: "/parent/messages",
        actionLabel: "Lire le message",
      },
      {
        id: "4",
        title: "Rappel: Réunion parents-professeurs",
        message: "N'oubliez pas la réunion parents-professeurs de jeudi prochain",
        type: "reminder",
        priority: "normal",
        isRead: true,
        createdAt: "2024-01-12T10:00:00",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.isRead).length)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-indigo-600" />
      case "homework":
        return <BookOpen className="h-4 w-4 text-green-600" />
      case "grade":
        return <Award className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    setUnreadCount(0)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "À l'instant"
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)}h`
    } else {
      return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    }
  }

  if (!user) return null

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative bg-transparent">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-600">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <Card className="w-80 shadow-lg border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                      Tout marquer lu
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Aucune notification</p>
                    </div>
                  ) : (
                    notifications
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-muted/50 cursor-pointer border-b border-border/50 ${
                            !notification.isRead ? "bg-blue-50 dark:bg-blue-950/20" : ""
                          }`}
                          onClick={() => !notification.isRead && markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    !notification.isRead ? "font-semibold" : ""
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <div className="flex items-center space-x-1">
                                  {notification.priority === "urgent" && (
                                    <Badge className={getPriorityColor(notification.priority)} size="sm">
                                      Urgent
                                    </Badge>
                                  )}
                                  {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(notification.createdAt)}
                                </span>
                                {notification.actionUrl && notification.actionLabel && (
                                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                                    {notification.actionLabel}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
