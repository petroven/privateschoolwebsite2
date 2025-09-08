"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Newspaper, Search, Filter, Calendar, Clock, Users } from "lucide-react"
import { useState } from "react"

export default function ParentNews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  // Mock data - replace with actual API calls
  const news = [
    {
      id: "1",
      title: "Sortie scolaire au Musée des Sciences",
      excerpt:
        "Les classes de CM1 et CM2 visiteront le Musée des Sciences le 25 janvier. Autorisation parentale requise.",
      content:
        "Nous organisons une sortie pédagogique au Musée des Sciences pour les classes de CM1 et CM2 le jeudi 25 janvier 2024. Cette visite s'inscrit dans le cadre du programme de sciences et permettra aux élèves de découvrir les expositions sur l'espace et les dinosaures. Le départ est prévu à 9h00 depuis l'école et le retour vers 16h30. Le coût de la sortie est de 12€ par élève, incluant le transport et l'entrée au musée. Une autorisation parentale est obligatoire et doit être remise avant le 20 janvier. N'hésitez pas à nous contacter pour toute question.",
      category: "Sorties et voyages",
      priority: "high",
      publishDate: "2024-01-15T10:00:00",
      author: "Direction",
      targetAudience: ["parents", "students"],
      isRead: false,
    },
    {
      id: "2",
      title: "Réunion parents-professeurs - Janvier 2024",
      excerpt: "Les réunions individuelles auront lieu du 22 au 26 janvier. Inscriptions ouvertes dès maintenant.",
      content:
        "Les réunions parents-professeurs du second trimestre se dérouleront du lundi 22 au vendredi 26 janvier 2024. Ces entretiens individuels de 15 minutes permettront de faire le point sur les progrès de votre enfant et d'échanger sur ses besoins spécifiques. Les créneaux sont disponibles de 16h30 à 19h00 chaque jour. Pour vous inscrire, connectez-vous à votre espace parent ou contactez le secrétariat. Nous vous rappelons l'importance de ces échanges pour le suivi personnalisé de chaque élève.",
      category: "Vie scolaire",
      priority: "normal",
      publishDate: "2024-01-12T14:30:00",
      author: "Secrétariat",
      targetAudience: ["parents"],
      isRead: true,
    },
    {
      id: "3",
      title: "Nouvelle cantine bio - Menus de janvier",
      excerpt: "Découvrez les nouveaux menus bio de la cantine scolaire pour le mois de janvier.",
      content:
        "Nous sommes heureux de vous annoncer que notre cantine propose désormais des repas 100% bio. Cette démarche s'inscrit dans notre engagement pour une alimentation saine et respectueuse de l'environnement. Les menus du mois de janvier privilégient les produits locaux et de saison. Vous trouverez le détail des repas sur notre site internet, mis à jour chaque semaine. Les tarifs restent inchangés. Pour toute allergie ou régime spécifique, merci de nous contacter.",
      category: "Vie scolaire",
      priority: "low",
      publishDate: "2024-01-08T09:15:00",
      author: "Service restauration",
      targetAudience: ["parents"],
      isRead: true,
    },
    {
      id: "4",
      title: "Spectacle de fin d'année - Appel aux bénévoles",
      excerpt: "Nous recherchons des parents bénévoles pour nous aider à organiser le spectacle de fin d'année.",
      content:
        "Le spectacle de fin d'année aura lieu le vendredi 21 juin 2024 à 19h00 dans la salle polyvalente. Cette année, le thème choisi est 'Voyage autour du monde'. Nous recherchons des parents bénévoles pour nous aider dans l'organisation : confection de costumes, décors, installation technique, accueil du public. Si vous souhaitez participer à cette belle aventure, merci de vous manifester auprès de l'équipe enseignante. Votre aide sera précieuse pour faire de cette soirée un moment inoubliable pour nos élèves.",
      category: "Événements",
      priority: "normal",
      publishDate: "2024-01-05T16:45:00",
      author: "Équipe pédagogique",
      targetAudience: ["parents"],
      isRead: false,
    },
  ]

  const categories = ["Actualités générales", "Événements", "Pédagogie", "Vie scolaire", "Sorties et voyages"]

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority
    return matchesSearch && matchesCategory && matchesPriority
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>
      case "normal":
        return <Badge variant="secondary">Normal</Badge>
      case "low":
        return <Badge variant="outline">Info</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = news.filter((item) => !item.isRead).length

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Actualités de l'École</h1>
            <p className="text-gray-600">
              Restez informé des dernières nouvelles de l'établissement
              {unreadCount > 0 && (
                <span className="ml-2 text-blue-600 font-medium">
                  ({unreadCount} non lu{unreadCount > 1 ? "s" : ""})
                </span>
              )}
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les priorités" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">Important</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedPriority("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* News List */}
          <div className="space-y-6">
            {filteredNews.map((item) => (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all hover:shadow-md ${
                  !item.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Newspaper className="h-5 w-5 text-gray-500" />
                        <Badge variant="secondary">{item.category}</Badge>
                        {getPriorityBadge(item.priority)}
                        {!item.isRead && <Badge className="bg-blue-600">Nouveau</Badge>}
                      </div>
                      <CardTitle className={`text-xl mb-2 ${!item.isRead ? "font-bold" : ""}`}>{item.title}</CardTitle>
                      <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(item.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{item.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-gray-700 mb-4">
                    <p>{item.content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Publié le {new Date(item.publishDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    {!item.isRead && (
                      <Button variant="outline" size="sm">
                        Marquer comme lu
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Aucune actualité trouvée</p>
                <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
