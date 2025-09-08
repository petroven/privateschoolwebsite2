"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Images, Search, Calendar, Users, Eye, Shield, User, Camera, Video, Download } from "lucide-react"
import { useState } from "react"

export default function ParentGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  // Mock data - will be replaced with real API calls
  const albums = [
    {
      id: "1",
      title: "Sortie au Musée des Sciences",
      description: "Photos de notre visite éducative au musée",
      childName: "Emma Dubois",
      className: "CM2 A",
      teacherName: "Prof. Martin",
      type: "outing",
      mediaCount: 24,
      imageCount: 20,
      videoCount: 4,
      hasChildPhotos: true,
      consentGiven: true,
      createdAt: "2024-01-15T10:00:00",
      thumbnail: "/placeholder-o92qt.png",
    },
    {
      id: "2",
      title: "Projet Sciences - Les Volcans",
      description: "Présentation des maquettes de volcans réalisées par les élèves",
      childName: "Emma Dubois",
      className: "CM2 A",
      teacherName: "Prof. Martin",
      type: "project",
      mediaCount: 15,
      imageCount: 12,
      videoCount: 3,
      hasChildPhotos: true,
      consentGiven: true,
      createdAt: "2024-01-12T14:30:00",
      thumbnail: "/placeholder-pqfa7.png",
    },
    {
      id: "3",
      title: "Activités de Noël",
      description: "Préparation des décorations et spectacle de Noël",
      childName: "Lucas Dubois",
      className: "CE2 B",
      teacherName: "Mme Petit",
      type: "school_event",
      mediaCount: 32,
      imageCount: 28,
      videoCount: 4,
      hasChildPhotos: true,
      consentGiven: false,
      createdAt: "2024-01-10T09:15:00",
      thumbnail: "/placeholder-8pvml.png",
    },
    {
      id: "4",
      title: "Cours de Mathématiques",
      description: "Séance de travail en groupe sur les fractions",
      childName: "Emma Dubois",
      className: "CM2 A",
      teacherName: "Prof. Martin",
      type: "class_activity",
      mediaCount: 8,
      imageCount: 8,
      videoCount: 0,
      hasChildPhotos: false,
      consentGiven: null,
      createdAt: "2024-01-08T11:20:00",
      thumbnail: "/placeholder-5r3wf.png",
    },
  ]

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch = album.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChild = selectedChild === "all" || album.childName === selectedChild
    const matchesType = selectedType === "all" || album.type === selectedType
    return matchesSearch && matchesChild && matchesType
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

  const giveConsent = (albumId: string) => {
    console.log("[v0] Giving consent for album:", albumId)
    // Here you would typically send the consent to your API
  }

  const galleryStats = {
    totalAlbums: albums.length,
    withChildPhotos: albums.filter((a) => a.hasChildPhotos).length,
    consentPending: albums.filter((a) => a.hasChildPhotos && !a.consentGiven).length,
    totalMedia: albums.reduce((sum, a) => sum + a.mediaCount, 0),
  }

  const children = [...new Set(albums.map((a) => a.childName))]

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Galerie Photos & Vidéos</h1>
            <p className="text-muted-foreground">Découvrez les moments de classe de vos enfants</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Avec vos enfants</p>
                    <p className="text-2xl font-bold text-green-600">{galleryStats.withChildPhotos}</p>
                  </div>
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Consentement requis</p>
                    <p className="text-2xl font-bold text-orange-600">{galleryStats.consentPending}</p>
                  </div>
                  <Shield className="h-8 w-8 text-muted-foreground" />
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
          </div>

          {/* Consent Alert */}
          {galleryStats.consentPending > 0 && (
            <Card className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      Consentement requis pour {galleryStats.consentPending} album(s)
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-300">
                      Certains albums contiennent des photos de vos enfants et nécessitent votre autorisation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les enfants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les enfants</SelectItem>
                    {children.map((child) => (
                      <SelectItem key={child} value={child}>
                        {child}
                      </SelectItem>
                    ))}
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
                    setSelectedChild("all")
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
                      {album.hasChildPhotos && (
                        <Badge
                          className={
                            album.consentGiven
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          }
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          {album.consentGiven ? "Autorisé" : "Consentement requis"}
                        </Badge>
                      )}
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
                    <div className="space-y-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{album.childName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(album.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{album.className}</span>
                        </div>
                        <span className="text-xs">Par {album.teacherName}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {album.hasChildPhotos && album.consentGiven ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="mr-2 h-4 w-4" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      ) : album.hasChildPhotos && !album.consentGiven ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                          onClick={() => giveConsent(album.id)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Donner mon consentement
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      )}
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
                <p className="text-sm text-muted-foreground">Les albums contenant vos enfants apparaîtront ici</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
