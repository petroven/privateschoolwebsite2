"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Images, Plus, Search, Calendar, Users, Eye, EyeOff, Shield, Upload, Video, Camera } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TeacherGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  // Mock data - will be replaced with real API calls
  const albums = [
    {
      id: "1",
      title: "Sortie au Musée des Sciences",
      description: "Photos de notre visite éducative au musée",
      className: "CM2 A",
      type: "outing",
      isPublished: true,
      requiresConsent: true,
      mediaCount: 24,
      imageCount: 20,
      videoCount: 4,
      consentRate: 85,
      createdAt: "2024-01-15T10:00:00",
      thumbnail: "/placeholder-o92qt.png",
    },
    {
      id: "2",
      title: "Projet Sciences - Les Volcans",
      description: "Présentation des maquettes de volcans réalisées par les élèves",
      className: "CM2 A",
      type: "project",
      isPublished: true,
      requiresConsent: true,
      mediaCount: 15,
      imageCount: 12,
      videoCount: 3,
      consentRate: 92,
      createdAt: "2024-01-12T14:30:00",
      thumbnail: "/placeholder-pqfa7.png",
    },
    {
      id: "3",
      title: "Activités de Noël",
      description: "Préparation des décorations et spectacle de Noël",
      className: "CM2 B",
      type: "school_event",
      isPublished: false,
      requiresConsent: true,
      mediaCount: 32,
      imageCount: 28,
      videoCount: 4,
      consentRate: 67,
      createdAt: "2024-01-10T09:15:00",
      thumbnail: "/placeholder-8pvml.png",
    },
    {
      id: "4",
      title: "Cours de Mathématiques",
      description: "Séance de travail en groupe sur les fractions",
      className: "CM2 A",
      type: "class_activity",
      isPublished: true,
      requiresConsent: false,
      mediaCount: 8,
      imageCount: 8,
      videoCount: 0,
      consentRate: 100,
      createdAt: "2024-01-08T11:20:00",
      thumbnail: "/placeholder-5r3wf.png",
    },
  ]

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch = album.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || album.className === selectedClass
    const matchesType = selectedType === "all" || album.type === selectedType
    return matchesSearch && matchesClass && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "class_activity":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "school_event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "project":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "outing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "class_activity":
        return "Activité de classe"
      case "school_event":
        return "Événement scolaire"
      case "project":
        return "Projet"
      case "outing":
        return "Sortie"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const galleryStats = {
    totalAlbums: albums.length,
    publishedAlbums: albums.filter((a) => a.isPublished).length,
    totalMedia: albums.reduce((sum, a) => sum + a.mediaCount, 0),
    avgConsent: Math.round(albums.reduce((sum, a) => sum + a.consentRate, 0) / albums.length),
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Galerie Photos & Vidéos</h1>
              <p className="text-muted-foreground">Partagez les moments de classe en toute sécurité</p>
            </div>
            <Link href="/teacher/gallery/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvel album
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Albums</p>
                    <p className="text-2xl font-bold">{galleryStats.totalAlbums}</p>
                  </div>
                  <Images className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Publiés</p>
                    <p className="text-2xl font-bold text-green-600">{galleryStats.publishedAlbums}</p>
                  </div>
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Médias</p>
                    <p className="text-2xl font-bold text-blue-600">{galleryStats.totalMedia}</p>
                  </div>
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Consentement</p>
                    <p className="text-2xl font-bold text-purple-600">{galleryStats.avgConsent}%</p>
                  </div>
                  <Shield className="h-8 w-8 text-muted-foreground" />
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
                    placeholder="Rechercher un album..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    <SelectItem value="CM2 A">CM2 A</SelectItem>
                    <SelectItem value="CM2 B">CM2 B</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="class_activity">Activité de classe</SelectItem>
                    <SelectItem value="school_event">Événement scolaire</SelectItem>
                    <SelectItem value="project">Projet</SelectItem>
                    <SelectItem value="outing">Sortie</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedClass("all")
                    setSelectedType("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Albums Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((album) => (
                <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={album.thumbnail || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Badge className={getTypeColor(album.type)}>{getTypeLabel(album.type)}</Badge>
                      <Badge variant={album.isPublished ? "default" : "secondary"}>
                        {album.isPublished ? "Publié" : "Brouillon"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 flex space-x-2">
                      {album.imageCount > 0 && (
                        <Badge variant="outline" className="bg-white/90 text-black">
                          <Camera className="mr-1 h-3 w-3" />
                          {album.imageCount}
                        </Badge>
                      )}
                      {album.videoCount > 0 && (
                        <Badge variant="outline" className="bg-white/90 text-black">
                          <Video className="mr-1 h-3 w-3" />
                          {album.videoCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{album.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{album.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{album.className}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(album.createdAt)}</span>
                      </div>
                    </div>
                    {album.requiresConsent && (
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Shield className="h-4 w-4 text-purple-600" />
                          <span className="text-muted-foreground">Consentement:</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${album.consentRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{album.consentRate}%</span>
                        </div>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Link href={`/teacher/gallery/${album.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </Link>
                      <Link href={`/teacher/gallery/${album.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        {album.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {filteredAlbums.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Images className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Aucun album trouvé</p>
                <p className="text-sm text-muted-foreground">
                  Créez votre premier album pour partager les moments de classe
                </p>
                <Link href="/teacher/gallery/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer un album
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
