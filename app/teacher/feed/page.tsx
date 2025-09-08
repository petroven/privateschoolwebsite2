"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare,
  Calendar,
  BookOpen,
  Bell,
  Users,
  Award,
  AlertTriangle,
  Camera,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react"
import { useState } from "react"

export default function TeacherFeed() {
  const [filter, setFilter] = useState("all")

  // Mock data - will be replaced with real API calls
  const feedItems = [
    {
      id: "1",
      type: "announcement",
      title: "Fermeture exceptionnelle demain",
      content:
        "L'école sera fermée demain en raison des conditions météorologiques. Les cours reprendront normalement lundi.",
      author: "Direction",
      authorRole: "admin",
      timestamp: "2024-01-15T08:00:00",
      priority: "urgent",
      audience: "all",
      interactions: { likes: 12, comments: 3, shares: 8 },
      hasLiked: false,
    },
    {
      id: "2",
      type: "homework",
      title: "Nouveau devoir ajouté",
      content: "Exercices de mathématiques - Chapitre 5 pour la classe CM2 A. À rendre pour le 18 janvier.",
      author: "Prof. Martin",
      authorRole: "teacher",
      timestamp: "2024-01-14T16:30:00",
      priority: "normal",
      audience: "parents",
      className: "CM2 A",
      subject: "Mathématiques",
      interactions: { likes: 5, comments: 2, shares: 1 },
      hasLiked: true,
    },
    {
      id: "3",
      type: "event",
      title: "Sortie au Musée des Sciences confirmée",
      content: "La sortie éducative au Musée des Sciences est confirmée pour vendredi 19 janvier. Départ à 9h00.",
      author: "Mme Petit",
      authorRole: "teacher",
      timestamp: "2024-01-14T14:20:00",
      priority: "normal",
      audience: "all",
      eventDate: "2024-01-19",
      interactions: { likes: 18, comments: 7, shares: 12 },
      hasLiked: false,
    },
    {
      id: "4",
      type: "gallery",
      title: "Nouvelles photos ajoutées",
      content: "Album 'Projet Sciences - Les Volcans' mis à jour avec 8 nouvelles photos des présentations.",
      author: "Prof. Martin",
      authorRole: "teacher",
      timestamp: "2024-01-14T11:15:00",
      priority: "normal",
      audience: "parents",
      albumName: "Projet Sciences - Les Volcans",
      mediaCount: 8,
      interactions: { likes: 15, comments: 4, shares: 6 },
      hasLiked: true,
    },
    {
      id: "5",
      type: "grade",
      title: "Nouvelles notes disponibles",
      content: "Les notes du contrôle de français du 12 janvier sont maintenant disponibles pour la classe CM2 A.",
      author: "Mme Durand",
      authorRole: "teacher",
      timestamp: "2024-01-13T17:45:00",
      priority: "normal",
      audience: "parents",
      className: "CM2 A",
      subject: "Français",
      interactions: { likes: 8, comments: 1, shares: 2 },
      hasLiked: false,
    },
    {
      id: "6",
      type: "message",
      title: "Message de la direction",
      content: "Rappel important concernant les réunions parents-professeurs de la semaine prochaine.",
      author: "Direction",
      authorRole: "admin",
      timestamp: "2024-01-13T10:30:00",
      priority: "high",
      audience: "all",
      interactions: { likes: 22, comments: 5, shares: 15 },
      hasLiked: true,
    },
  ]

  const filteredItems = feedItems.filter((item) => {
    if (filter === "all") return true
    return item.type === filter
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <Bell className="h-5 w-5 text-blue-600" />
      case "homework":
        return <BookOpen className="h-5 w-5 text-green-600" />
      case "event":
        return <Calendar className="h-5 w-5 text-indigo-600" />
      case "gallery":
        return <Camera className="h-5 w-5 text-purple-600" />
      case "grade":
        return <Award className="h-5 w-5 text-orange-600" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-cyan-600" />
      default:
        return <MessageSquare className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "announcement":
        return "Annonce"
      case "homework":
        return "Devoir"
      case "event":
        return "Événement"
      case "gallery":
        return "Galerie"
      case "grade":
        return "Notes"
      case "message":
        return "Message"
      default:
        return type
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "À l'instant"
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)}h`
    } else if (diffInHours < 48) {
      return "Hier"
    } else {
      return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    }
  }

  const toggleLike = (itemId: string) => {
    console.log("[v0] Toggling like for item:", itemId)
    // Here you would typically send the like/unlike to your API
  }

  const filterOptions = [
    { value: "all", label: "Tout", icon: MessageSquare },
    { value: "announcement", label: "Annonces", icon: Bell },
    { value: "homework", label: "Devoirs", icon: BookOpen },
    { value: "event", label: "Événements", icon: Calendar },
    { value: "gallery", label: "Galerie", icon: Camera },
    { value: "grade", label: "Notes", icon: Award },
    { value: "message", label: "Messages", icon: MessageSquare },
  ]

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Fil d'Actualité</h1>
            <p className="text-muted-foreground">Restez informé de toute l'activité de votre établissement</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
            {filterOptions.map((option) => {
              const Icon = option.icon
              return (
                <Button
                  key={option.value}
                  variant={filter === option.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Feed Items */}
          <div className="space-y-6">
            {filteredItems
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Avatar>
                          <AvatarFallback>
                            {item.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(item.type)}
                          <Badge variant="outline">{getTypeLabel(item.type)}</Badge>
                          {item.priority !== "normal" && (
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority === "urgent" && <AlertTriangle className="mr-1 h-3 w-3" />}
                              {item.priority === "urgent" ? "Urgent" : "Important"}
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{formatTimestamp(item.timestamp)}</span>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">{item.author}</span>
                            <span className="mx-1">•</span>
                            <span>{item.authorRole === "admin" ? "Administration" : "Professeur"}</span>
                            {item.className && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{item.className}</span>
                              </>
                            )}
                          </p>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.content}</p>

                        {/* Additional Info */}
                        {item.subject && (
                          <div className="flex items-center space-x-2 mb-3">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Matière: {item.subject}</span>
                          </div>
                        )}
                        {item.eventDate && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Date: {new Date(item.eventDate).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                        )}
                        {item.albumName && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Camera className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Album: {item.albumName} ({item.mediaCount} médias)
                            </span>
                          </div>
                        )}

                        {/* Interactions */}
                        <div className="flex items-center space-x-6 pt-3 border-t border-border">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(item.id)}
                            className={`flex items-center space-x-2 ${
                              item.hasLiked ? "text-red-600" : "text-muted-foreground"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${item.hasLiked ? "fill-current" : ""}`} />
                            <span>{item.interactions.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-2 text-muted-foreground"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{item.interactions.comments}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-2 text-muted-foreground"
                          >
                            <Share className="h-4 w-4" />
                            <span>{item.interactions.shares}</span>
                          </Button>
                          <div className="flex-1"></div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>
                              {item.audience === "all"
                                ? "Tous"
                                : item.audience === "parents"
                                  ? "Parents"
                                  : "Professeurs"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Aucune actualité trouvée</p>
                <p className="text-sm text-muted-foreground">Les actualités de votre établissement apparaîtront ici</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
