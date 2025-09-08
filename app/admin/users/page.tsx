"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone, UserCheck, UserX } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data - will be replaced with real API calls
  const users = [
    {
      id: "1",
      firstName: "Marie",
      lastName: "Dubois",
      email: "admin@sainte-marie.fr",
      role: "admin",
      phone: "01 42 36 12 34",
      isActive: true,
      createdAt: "2023-09-01",
      lastLogin: "2024-01-15T09:30:00",
    },
    {
      id: "2",
      firstName: "Pierre",
      lastName: "Martin",
      email: "prof.martin@sainte-marie.fr",
      role: "teacher",
      phone: "01 42 36 12 35",
      isActive: true,
      createdAt: "2023-09-01",
      lastLogin: "2024-01-15T08:15:00",
      assignedClasses: ["CM2 A", "CM2 B"],
    },
    {
      id: "3",
      firstName: "Sophie",
      lastName: "Durand",
      email: "parent@example.fr",
      role: "parent",
      phone: "06 12 34 56 78",
      isActive: true,
      createdAt: "2023-09-15",
      lastLogin: "2024-01-14T19:45:00",
      children: ["Emma Dubois", "Lucas Dubois"],
    },
    {
      id: "4",
      firstName: "Anne",
      lastName: "Petit",
      email: "mme.petit@sainte-marie.fr",
      role: "teacher",
      phone: "01 42 36 12 36",
      isActive: true,
      createdAt: "2023-10-01",
      lastLogin: "2024-01-15T07:45:00",
      assignedClasses: ["CE2 B"],
    },
    {
      id: "5",
      firstName: "Jean",
      lastName: "Rousseau",
      email: "j.rousseau@example.fr",
      role: "parent",
      phone: "06 98 76 54 32",
      isActive: false,
      createdAt: "2023-11-01",
      lastLogin: "2024-01-10T16:20:00",
      children: ["Thomas Rousseau"],
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || (selectedStatus === "active" ? user.isActive : !user.isActive)
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Administrateur</Badge>
      case "teacher":
        return <Badge className="bg-blue-100 text-blue-800">Professeur</Badge>
      case "parent":
        return <Badge className="bg-green-100 text-green-800">Parent</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return `Aujourd'hui à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    }
    if (diffInHours < 48) {
      return `Hier à ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
    }
    return date.toLocaleDateString("fr-FR")
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    admins: users.filter((u) => u.role === "admin").length,
    teachers: users.filter((u) => u.role === "teacher").length,
    parents: users.filter((u) => u.role === "parent").length,
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
              <p className="text-gray-600">Gérez les comptes des professeurs, parents et administrateurs</p>
            </div>
            <Link href="/admin/users/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel utilisateur
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold">{userStats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-purple-600">{userStats.admins}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Professeurs</p>
                  <p className="text-2xl font-bold text-blue-600">{userStats.teachers}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Parents</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.parents}</p>
                </div>
              </CardContent>
            </Card>
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
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les rôles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    <SelectItem value="admin">Administrateurs</SelectItem>
                    <SelectItem value="teacher">Professeurs</SelectItem>
                    <SelectItem value="parent">Parents</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actifs</SelectItem>
                    <SelectItem value="inactive">Inactifs</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedRole("all")
                    setSelectedStatus("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead>Informations</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-3 w-3" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {user.isActive ? (
                            <UserCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <UserX className="h-4 w-4 text-red-600" />
                          )}
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{formatLastLogin(user.lastLogin)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.role === "teacher" && user.assignedClasses && (
                            <div>
                              <p className="font-medium">Classes:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.assignedClasses.map((cls) => (
                                  <Badge key={cls} variant="outline" className="text-xs">
                                    {cls}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {user.role === "parent" && user.children && (
                            <div>
                              <p className="font-medium">Enfants:</p>
                              <div className="text-xs text-gray-600 mt-1">{user.children.join(", ")}</div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun utilisateur trouvé avec ces critères</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
