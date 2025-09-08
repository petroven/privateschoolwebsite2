"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Calendar, Users, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminNews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedAudience, setSelectedAudience] = useState("all")

  // Mock data - will be replaced with real API calls
  const news = [
    {
      id: "1",
      title: "Sortie scolaire au Musée des Sciences",
      content:
        "Nous organisons une sortie pédagogique au Musée des Sciences pour les classes de CM1 et CM2. Cette visite permettra aux élèves de découvrir les merveilles de la science de manière interactive...",
      authorId: "1",
      authorName: "Marie Dubois",
      targetAudience: "all",
      isPublished: true,
      publishedAt: "2024-01-15T10:00:00",
      createdAt: "2024-01-14T16:30:00",
      updatedAt: "2024-01-15T09:45:00",
      views: 156,
      category: "Événement",
    },
    {
      id: "2",
      title: "Réunion parents-professeurs - Février 2024",
      content:
        "Les réunions individuelles parents-professeurs auront lieu du 22 au 26 janvier 2024. Chaque famille recevra un créneau personnalisé pour échanger sur les progrès de leur enfant...",
      authorId: "1",
      authorName: "Marie Dubois",
      targetAudience: "parents",
      isPublished: true,
      publishedAt: "2024-01-12T14:00:00",
      createdAt: "2024-01-10T11:20:00",
      updatedAt: "2024-01-12T13:55:00",
      views: 89,
      category: "Réunion",
    },
    {
      id: "3",
      title: "Nouvelle méthode d'évaluation en mathématiques",
      content:
        "À partir du prochain trimestre, nous mettons en place une nouvelle approche d'évaluation en mathématiques basée sur les compétences. Cette méthode permettra un suivi plus précis...",
      authorId: "2",
      authorName: "Pierre Martin",
      targetAudience: "teachers",
      isPublished: false,
      publishedAt: null,
      createdAt: "2024-01-08T09:15:00",
      updatedAt: "2024-01-08T09:15:00",
      views: 0,
      category: "Pédagogie",
    },
    {
      id: "4",
      title: "Fermeture exceptionnelle - Travaux de maintenance",
      content:
        "L'école sera exceptionnellement fermée le vendredi 26 janvier pour des travaux de maintenance du système de chauffage. Les cours reprendront normalement le lundi 29 janvier...",
      authorId: "1",
      authorName: "Marie Dubois",
      targetAudience: "all",
      isPublished: true,
      publishedAt: "2024-01-20T08:00:00",
      createdAt: "2024-01-19T17:30:00",
      updatedAt: "2024-01-20T07:55:00",
      views: 203,
      category: "Information",
    },
  ]

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && item.isPublished) ||
      (selectedStatus === "draft" && !item.isPublished)
    const matchesAudience = selectedAudience === "all" || item.targetAudience === selectedAudience
    return matchesSearch && matchesStatus && matchesAudience
  })

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case "all":
        return <Badge className="bg-blue-100 text-blue-800">Tous</Badge>
      case "teachers":
        return <Badge className="bg-green-100 text-green-800">Professeurs</Badge>
      case "parents":
        return <Badge className="bg-purple-100 text-purple-800">Parents</Badge>
      default:
        return <Badge variant="outline">{audience}</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Événement":
        return "bg-orange-100 text-orange-800"
      case "Réunion":
        return "bg-blue-100 text-blue-800"
      case "Pédagogie":
        return "bg-green-100 text-green-800"
      case "Information":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non publié"
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const newsStats = {
    total: news.length,
    published: news.filter((n) => n.isPublished).length,
    draft: news.filter((n) => !n.isPublished).length,
    totalViews: news.reduce((sum, n) => sum + n.views, 0),
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Actualités</h1>
              <p className="text-gray-600">Créez et gérez les actualités de votre établissement</p>
            </div>
            <Link href="/admin/news/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle actualité
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total actualités</p>
                    <p className="text-2xl font-bold">{newsStats.total}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Publiées</p>
                    <p className="text-2xl font-bold text-green-600">{newsStats.published}</p>
                  </div>
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Brouillons</p>
                    <p className="text-2xl font-bold text-orange-600">{newsStats.draft}</p>
                  </div>
                  <EyeOff className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vues totales</p>
                    <p className="text-2xl font-bold text-blue-600">{newsStats.totalViews}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
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
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher une actualité..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="published">Publiées</SelectItem>
                    <SelectItem value="draft">Brouillons</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les audiences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les audiences</SelectItem>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="teachers">Professeurs</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedStatus("all")
                    setSelectedAudience("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* News List */}
          <div className="space-y-6">
            {filteredNews
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                          {getAudienceBadge(item.targetAudience)}
                          <Badge variant={item.isPublished ? "default" : "secondary"}>
                            {item.isPublished ? "Publié" : "Brouillon"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {item.authorName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{item.authorName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(item.publishedAt || item.createdAt)}</span>
                          </div>
                          {item.isPublished && (
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4" />
                              <span>{item.views} vues</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Link href={`/admin/news/${item.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          {item.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredNews.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Aucune actualité trouvée</p>
                <p className="text-sm text-gray-400">Créez votre première actualité pour informer votre communauté</p>
                <Link href="/admin/news/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une actualité
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
