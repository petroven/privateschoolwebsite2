"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useSchool } from "@/components/school-provider"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SchoolSelector } from "@/components/school-selector"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  Menu,
} from "lucide-react"
import Link from "next/link"

export function MobileNavigation() {
  const { user, logout } = useAuth()
  const { currentSchool } = useSchool()
  const [open, setOpen] = useState(false)

  if (!user) return null

  const getNavigationItems = () => {
    switch (user.role) {
      case "admin":
        return [
          { href: "/admin", label: "Tableau de bord", icon: BarChart3 },
          { href: "/admin/schools", label: "Écoles", icon: GraduationCap },
          { href: "/admin/users", label: "Utilisateurs", icon: Users },
          { href: "/admin/classes", label: "Classes", icon: BookOpen },
          { href: "/admin/students", label: "Élèves", icon: Users },
          { href: "/admin/news", label: "Actualités", icon: MessageSquare },
          { href: "/admin/calendar", label: "Calendrier", icon: Calendar },
          { href: "/admin/reports", label: "Rapports", icon: BarChart3 },
          { href: "/admin/settings", label: "Paramètres", icon: Settings },
        ]
      case "teacher":
        return [
          { href: "/teacher", label: "Tableau de bord", icon: BarChart3 },
          { href: "/teacher/classes", label: "Mes classes", icon: BookOpen },
          { href: "/teacher/grades", label: "Notes", icon: BookOpen },
          { href: "/teacher/absences", label: "Absences", icon: Calendar },
          { href: "/teacher/messages", label: "Messages", icon: MessageSquare },
        ]
      case "parent":
        return [
          { href: "/parent", label: "Tableau de bord", icon: BarChart3 },
          { href: "/parent/children", label: "Mes enfants", icon: Users },
          { href: "/parent/grades", label: "Notes", icon: BookOpen },
          { href: "/parent/absences", label: "Absences", icon: Calendar },
          { href: "/parent/messages", label: "Messages", icon: MessageSquare },
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 pb-4 border-b">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">EduConnect</span>
              {currentSchool && <span className="text-xs text-muted-foreground">{currentSchool.name}</span>}
            </div>
          </div>

          <nav className="flex-1 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          <div className="border-t pt-4 space-y-4">
            <div className="px-3">
              <SchoolSelector />
            </div>

            <div className="flex items-center justify-between px-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <div>
                  <p className="font-medium text-foreground">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs">
                    {user.role === "admin" ? "Admin" : user.role === "teacher" ? "Professeur" : "Parent"}
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <Button
              variant="outline"
              onClick={logout}
              className="w-full flex items-center space-x-2 mx-3 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
