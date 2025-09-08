"use client"

import { useAuth } from "@/components/auth-provider"
import { useSchool } from "@/components/school-provider"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SchoolSelector } from "@/components/school-selector"
import { MobileNavigation } from "@/components/mobile-navigation"
import {
  GraduationCap,
  LogOut,
  User,
  BookOpen,
  Users,
  Settings,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const { user, logout } = useAuth()
  const { currentSchool } = useSchool()

  if (!user) return null

  const getNavigationItems = () => {
    switch (user.role) {
      case "admin":
        return [
          { href: "/admin", label: "Tableau de bord", icon: BarChart3 },
          { href: "/admin/schools", label: "Écoles", icon: GraduationCap },
          { href: "/admin/users", label: "Utilisateurs", icon: Users },
          { href: "/admin/calendar", label: "Calendrier", icon: Calendar },
          { href: "/admin/settings", label: "Paramètres", icon: Settings },
        ]
      case "teacher":
        return [
          { href: "/teacher", label: "Tableau de bord", icon: BarChart3 },
          { href: "/teacher/feed", label: "Fil d'actualité", icon: MessageSquare },
          { href: "/teacher/classes", label: "Mes classes", icon: BookOpen },
          { href: "/teacher/grades", label: "Notes", icon: BookOpen },
          { href: "/teacher/homework", label: "Cahier de texte", icon: BookOpen },
          { href: "/teacher/absences", label: "Absences", icon: Calendar },
          { href: "/teacher/calendar", label: "Calendrier", icon: Calendar },
          { href: "/teacher/messages", label: "Messages", icon: MessageSquare },
        ]
      case "parent":
        return [
          { href: "/parent", label: "Tableau de bord", icon: BarChart3 },
          { href: "/parent/feed", label: "Fil d'actualité", icon: MessageSquare },
          { href: "/parent/children", label: "Mes enfants", icon: Users },
          { href: "/parent/grades", label: "Notes", icon: BookOpen },
          { href: "/parent/homework", label: "Devoirs", icon: BookOpen },
          { href: "/parent/absences", label: "Absences", icon: Calendar },
          { href: "/parent/calendar", label: "Calendrier", icon: Calendar },
          { href: "/parent/messages", label: "Messages", icon: MessageSquare },
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <nav className="bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">EduConnect</span>
              {currentSchool && (
                <span className="text-xs text-muted-foreground hidden sm:block">{currentSchool.name}</span>
              )}
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MobileNavigation />

          <div className="hidden md:flex items-center space-x-4">
            <SchoolSelector />
            <ThemeToggle />
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">
                {user.first_name} {user.last_name}
              </span>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                {user.role === "admin" ? "Admin" : user.role === "teacher" ? "Professeur" : "Parent"}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="flex items-center space-x-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
