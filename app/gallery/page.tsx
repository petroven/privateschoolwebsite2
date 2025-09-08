import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin } from "lucide-react"

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "Rentrée Scolaire 2024",
      category: "Événements",
      date: "Septembre 2024",
      location: "Campus Principal",
      participants: "500+ élèves",
      image: "/placeholder-h7q4j.png",
      description: "Cérémonie d'ouverture de l'année scolaire avec accueil des nouveaux élèves",
    },
    {
      title: "Laboratoire de Sciences",
      category: "Installations",
      date: "Permanent",
      location: "Bâtiment Sciences",
      participants: "Classes de lycée",
      image: "/placeholder-hzp86.png",
      description: "Nos laboratoires modernes équipés pour l'excellence scientifique",
    },
    {
      title: "Spectacle de Fin d'Année",
      category: "Arts",
      date: "Juin 2024",
      location: "Auditorium",
      participants: "200+ élèves",
      image: "/placeholder-1c6cg.png",
      description: "Représentation théâtrale et musicale des élèves de tous niveaux",
    },
    {
      title: "Compétition Sportive",
      category: "Sports",
      date: "Mai 2024",
      location: "Complexe Sportif",
      participants: "150+ athlètes",
      image: "/placeholder-zlc8n.png",
      description: "Championnat inter-écoles avec nos équipes d'athlétisme",
    },
    {
      title: "Bibliothèque Numérique",
      category: "Installations",
      date: "Permanent",
      location: "Centre de Ressources",
      participants: "Tous les élèves",
      image: "/placeholder-5mzkh.png",
      description: "Espace de lecture moderne avec ressources numériques",
    },
    {
      title: "Projet Environnemental",
      category: "Projets",
      date: "Avril 2024",
      location: "Jardin Pédagogique",
      participants: "Classes de CM2",
      image: "/placeholder-abvcb.png",
      description: "Initiative écologique avec création d'un potager pédagogique",
    },
    {
      title: "Échange International",
      category: "International",
      date: "Mars 2024",
      location: "Londres, UK",
      participants: "30 élèves",
      image: "/placeholder-eq24c.png",
      description: "Voyage d'études en Angleterre pour les classes européennes",
    },
    {
      title: "Salon des Métiers",
      category: "Orientation",
      date: "Février 2024",
      location: "Hall Principal",
      participants: "Classes de 3ème et lycée",
      image: "/placeholder-kjf3o.png",
      description: "Rencontre avec des professionnels pour l'orientation",
    },
    {
      title: "Concours de Mathématiques",
      category: "Académique",
      date: "Janvier 2024",
      location: "Salles de Classe",
      participants: "80 élèves",
      image: "/placeholder-j5fyv.png",
      description: "Olympiades de mathématiques avec nos meilleurs élèves",
    },
  ]

  const categories = [
    "Tous",
    "Événements",
    "Installations",
    "Arts",
    "Sports",
    "Projets",
    "International",
    "Orientation",
    "Académique",
  ]

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Galerie Photos</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez la vie de notre école à travers nos événements, installations et moments marquants de l'année
              scolaire.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <Button key={index} variant={index === 0 ? "default" : "outline"} size="sm" className="mb-2">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{item.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {item.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {item.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {item.participants}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Section */}
      <section className="py-8 text-center">
        <Button size="lg" variant="outline">
          Voir plus de photos
        </Button>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Vivez l'Expérience EduConnect</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez notre communauté et participez à tous ces moments exceptionnels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Planifier une visite
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
