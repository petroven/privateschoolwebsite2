import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence Académique",
      description:
        "Nous nous engageons à offrir une éducation de qualité supérieure qui prépare nos élèves à réussir dans un monde en constante évolution.",
    },
    {
      icon: Heart,
      title: "Bienveillance",
      description:
        "Chaque élève est unique et mérite d'être accompagné avec respect, empathie et attention personnalisée.",
    },
    {
      icon: Users,
      title: "Communauté",
      description:
        "Nous créons un environnement collaboratif où parents, élèves et enseignants travaillent ensemble vers un objectif commun.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "Nous intégrons les dernières technologies éducatives pour enrichir l'expérience d'apprentissage de nos élèves.",
    },
  ]

  const team = [
    {
      name: "Marie Dubois",
      role: "Directrice Générale",
      description: "20 ans d'expérience dans l'éducation privée",
      image: "/professional-woman-director.png",
    },
    {
      name: "Pierre Martin",
      role: "Directeur Pédagogique",
      description: "Expert en innovation pédagogique",
      image: "/professional-man-teacher.png",
    },
    {
      name: "Sophie Durand",
      role: "Responsable Relations Parents",
      description: "Spécialisée en communication éducative",
      image: "/placeholder-dl3os.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">À propos d'EduConnect</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Depuis plus de 15 ans, nous révolutionnons l'éducation privée en France grâce à notre plateforme innovante
              qui connecte écoles, familles et élèves.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                EduConnect a pour mission de transformer l'expérience éducative en créant des liens durables entre tous
                les acteurs de la communauté scolaire. Nous croyons que l'éducation est un effort collectif qui
                nécessite une communication transparente et des outils modernes.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Notre plateforme permet aux écoles privées de gérer efficacement leurs opérations quotidiennes tout en
                offrant aux parents et aux élèves un accès privilégié à l'information et aux ressources pédagogiques.
              </p>
              <Link href="/contact">
                <Button size="lg">
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img src="/modern-school-students.png" alt="École moderne avec élèves" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre approche de l'éducation et notre engagement envers la communauté scolaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre Équipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des professionnels passionnés et expérimentés qui s'engagent quotidiennement pour l'excellence éducative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez la Communauté EduConnect</h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez comment notre plateforme peut transformer l'expérience éducative de votre école et de vos
            familles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Demander une démonstration
              </Button>
            </Link>
            <Link href="/programs">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Voir nos programmes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
