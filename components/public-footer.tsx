import Link from "next/link"
import { GraduationCap, Mail, Phone } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EduConnect</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              La plateforme éducative complète pour la gestion scolaire des écoles privées. Connectez parents,
              professeurs et administration en un seul endroit.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                +33 1 23 45 67 89
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                contact@educonnect.fr
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Programmes
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Espace Parent
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Espace Professeur
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Administration
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 EduConnect. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
