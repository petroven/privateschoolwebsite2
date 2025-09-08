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
import { Plus, Search, Edit, Trash2, UserCheck, UserX, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data - will be replaced with real API calls
  const students = [
    {
      id: "1",
      firstName: "Emma",
      lastName: "Dubois",
      dateOfBirth: "2012-03-15",
      studentNumber: "2024001",
      classId: "1",
      className: "CM2 A",
      parentName: "Sophie Durand",
      parentEmail: "parent@example.fr",
      parentPhone: "06 12 34 56 78",
      isActive: true,
      enrollmentDate: "2023-09-01",
      averageGrade: 15.2,
      attendanceRate: 96,
      address: "45 Rue de la République, 75011 Paris",
    },
    {
      id: "2",
      firstName: "Lucas",
      lastName: "Martin",
      dateOfBirth: "2014-07-22",
      studentNumber: "2024002",
      classId: "4",
      className: "CE2 A",
      parentName: "Sophie Durand",
      parentEmail: "parent@example.fr",
      parentPhone: "06 12 34 56 78",
      isActive: true,
      enrollmentDate: "2023-09-01",
      averageGrade: 13.8,
      attendanceRate: 88,
      address: "45 Rue de la République, 75011 Paris",
    },
    {
      id: "3",
      firstName: "Thomas",
      lastName: "Rousseau",
      dateOfBirth: "2013-11-08",
      studentNumber: "2024003",
      classId: "3",
      className: "CM1 A",
      parentName: "Jean Rousseau",
      parentEmail: "j.rousseau@example.fr",
      parentPhone: "06 98 76 54 32",
      isActive: false,
      enrollmentDate: "2023-11-01",
      averageGrade: 12.5,
      attendanceRate: 75,
      address: "12 Avenue des Champs, 75008 Paris",
    },
    {
      id: "4",
      firstName: "Sophie",
      lastName: "Petit",
      dateOfBirth: "2014-01-30",
      studentNumber: "2024004",
      classId: "4",
      className: "CE2 A",
      parentName: "Anne Petit",
      parentEmail: "a.petit@example.fr",
      parentPhone: "01 45 67 89 12",
      isActive: true,
      enrollmentDate: "2024-01-15",
      averageGrade: 14.7,
      attendanceRate: 92,
      address: "78 Boulevard Saint-Germain, 75006 Paris",
    },
  ]

  const classes = [
    { id: "1", name: "CM2 A" },
    { id: "2", name: "CM2 B" },
    { id: "3", name: "CM1 A" },
    { id: "4", name: "CE2 A" },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.classId === selectedClass
    const matchesStatus =
      selectedStatus === "all" || (selectedStatus === "active" ? student.isActive : !student.isActive)
    return matchesSearch && matchesClass && matchesStatus
  })

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const getPerformanceColor = (grade: number) => {
    if (grade >= 15) return "text-green-600"
    if (grade >= 12) return "text-orange-600"
    return "text-red-600"
  }

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600"
    if (rate >= 80) return "text-orange-600"
    return "text-red-600"
  }

  const studentStats = {
    total: students.length,
    active: students.filter((s) => s.isActive).length,
    inactive: students.filter((s) => !s.isActive).length,
    averageGrade: Math.round((students.reduce((sum, s) => sum + s.averageGrade, 0) / students.length) * 10) / 10,
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gestion des Élèves</h1>
              <p className="text-gray-600 dark:text-gray-400">Gérez les inscriptions et informations des élèves</p>
            </div>
            <Link href="/admin/students/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel élève
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total élèves</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentStats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{studentStats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inactifs</p>
                  <p className="text-2xl font-bold text-red-600">{studentStats.inactive}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Moyenne générale</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(studentStats.averageGrade)}`}>
                    {studentStats.averageGrade}/20
                  </p>
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
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Rechercher un élève..."
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
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
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
                    setSelectedClass("all")
                    setSelectedStatus("all")
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Élèves ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Âge</TableHead>
                    <TableHead>Parent/Tuteur</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">N° {student.studentNumber}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{student.className}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{calculateAge(student.dateOfBirth)} ans</p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {new Date(student.dateOfBirth).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{student.parentName}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Mail className="h-3 w-3" />
                            <span>{student.parentEmail}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Phone className="h-3 w-3" />
                            <span>{student.parentPhone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Moyenne:</span>
                            <span className={`text-sm font-bold ${getPerformanceColor(student.averageGrade)}`}>
                              {student.averageGrade}/20
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Assiduité:</span>
                            <span className={`text-sm font-bold ${getAttendanceColor(student.attendanceRate)}`}>
                              {student.attendanceRate}%
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {student.isActive ? (
                            <UserCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <UserX className="h-4 w-4 text-red-600" />
                          )}
                          <Badge variant={student.isActive ? "default" : "secondary"}>
                            {student.isActive ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Inscrit le {new Date(student.enrollmentDate).toLocaleDateString("fr-FR")}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/admin/students/${student.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredStudents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">Aucun élève trouvé avec ces critères</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
