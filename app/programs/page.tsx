import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Clock, Award, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      title: "École Maternelle",
      ageRange: "3-6 ans",
      description: "Un environnement bienveillant pour les premiers apprentissages",
      features: [
        "Pédagogie Montessori",
        "Éveil artistique et musical",
        "Apprentissage des langues",
        "Développement psychomoteur",
      ],
      image: "/placeholder-zf54o.png",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "École Élémentaire",
      ageRange: "6-11 ans",
      description: "Acquisition des fondamentaux dans un cadre stimulant",
      features: [
        "Programmes officiels renforcés",
        "Initiation au numérique",
        "Projets interdisciplinaires",
        "Accompagnement personnalisé",
      ],
      image: "/placeholder-gmjkz.png",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Collège",
      ageRange: "11-15 ans",
      description: "Préparation à l'excellence avec un suivi individualisé",
      features: [
        "Classes à effectifs réduits",
        "Préparation au brevet",
        "Clubs et activités",
        "Orientation personnalisée",
      ],
      image: "/middle-school-classroom.png",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Lycée",
      ageRange: "15-18 ans",
      description: "Excellence académique et préparation aux études supérieures",
      features: [
        "Toutes les filières",
        "Préparation aux concours",
        "Partenariats universitaires",
        "Accompagnement Parcoursup",
      ],
      image: "/high-school-students-studying.png",
      color: "bg-orange-50 border-orange-200",
    },
  ]

  const specialPrograms = [
    {
      icon: BookOpen,
      title: "Programme Bilingue",
      description: "Immersion en anglais dès la maternelle avec des enseignants natifs",
    },
    {
      icon: Users,
      title: "Classes Européennes",
      description: "Ouverture internationale avec échanges et certifications",
    },
    {
      icon: Award,
      title: "Excellence Scientifique",
      description: "Laboratoires modernes et partenariats avec des universités",
    },
    {
      icon: Clock,
      title: "Soutien Scolaire",
      description: "Accompagnement personnalisé et aide aux devoirs",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nos Programmes Éducatifs</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              De la maternelle au lycée, découvrez nos programmes d'excellence conçus pour révéler le potentiel de
              chaque élève.
            </p>
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${program.color}`}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="w-full h-64 md:h-full object-cover rounded-l-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {program.ageRange}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl text-foreground">{program.title}</CardTitle>
                      <p className="text-muted-foreground">{program.description}</p>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-2 mb-6">
                        {program.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full bg-transparent">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Programmes Spécialisés</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des parcours d'excellence pour développer les talents et passions de chaque élève.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialPrograms.map((program, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <program.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{program.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Pédagogie</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Nous combinons les méthodes pédagogiques éprouvées avec les innovations technologiques pour offrir une
                expérience d'apprentissage riche et personnalisée.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Apprentissage Différencié</h4>
                    <p className="text-muted-foreground">
                      Adaptation aux rythmes et styles d'apprentissage de chaque élève
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Projets Collaboratifs</h4>
                    <p className="text-muted-foreground">
                      Développement de l'esprit d'équipe et des compétences sociales
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Évaluation Continue</h4>
                    <p className="text-muted-foreground">Suivi régulier des progrès avec feedback constructif</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/modern-tech-classroom.png"
                alt="Salle de classe moderne avec technologie"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Inscrivez Votre Enfant</h2>
          <p className="text-xl mb-8 opacity-90">
            Donnez à votre enfant les meilleures chances de réussir avec nos programmes d'excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Demander une inscription
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Planifier une visite
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
