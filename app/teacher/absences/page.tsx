"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TeacherAbsences() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock data - will be replaced with real API calls
  const absences = [
    {
      id: "1",
      studentName: "Emma Dubois",
      class: "CM2 A",
      date: "2024-01-15",
      period: "Matinée",
      isJustified: true,
      reason: "Rendez-vous médical",
      reportedBy: "Prof. Martin",
    },
    {
      id: "2",
      studentName: "Lucas Martin",
      class: "CM2 A",
      date: "2024-01-14",
      period: "Journée complète",
      isJustified: false,
      reason: "Non précisé",
      reportedBy: "Prof. Martin",
    },
    {
      id: "3",
      studentName: "Sophie Durand",
      class: "CM2 B",
      date: "2024-01-13",
      period: "Après-midi",
      isJustified: true,
      reason: "Maladie",
      reportedBy: "Prof. Dubois",
    },
    {
      id: "4",
      studentName: "Thomas Petit",
      class: "CM2 B",
      date: "2024-01-12",
      period: "Matinée",
      isJustified: null,
      reason: "En attente de justification",
      reportedBy: "Prof. Dubois",
    },
  ]

  const classes = ["CM2 A", "CM2 B"]

  const filteredAbsences = absences.filter((absence) => {
    const matchesSearch = absence.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || absence.class === selectedClass
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "justified" && absence.isJustified === true) ||
      (selectedStatus === "unjustified" && absence.isJustified === false) ||
      (selectedStatus === "pending" && absence.isJustified === null)
    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusBadge = (isJustified: boolean | null) => {
    if (isJustified === true) {
      return <Badge className="bg-green-100 text-green-800">Justifiée</Badge>
    }
    if (isJustified === false) {
      return <Badge variant="destructive">Non justifiée</Badge>
    }
    return <Badge className="bg-orange-100 text-orange-800">En attente</Badge>
  }

  const getStatusIcon = (isJustified: boolean | null) => {
    if (isJustified === true) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    if (isJustified === false) {
      return <XCircle className="h-4 w-4 text-red-600" />
    }
    return <Clock className="h-4 w-4 text-orange-600" />
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Absences</h1>
              <p className="text-gray-600">Suivez et gérez les absences de vos élèves</p>
            </div>
            <Link href="/teacher/absences/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Signaler une absence
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total absences</p>
                    <p className="text-2xl font-bold">{absences.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Justifiées</p>
                    <p className="text-2xl font-bold text-green-600">
                      {absences.filter((a) => a.isJustified === true).length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Non justifiées</p>
                    <p className="text-2xl font-bold text-red-600">
                      {absences.filter((a) => a.isJustified === false).length}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {absences.filter((a) => a.isJustified === null).length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-400" />
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
                      <SelectItem key={cls} value={cls}>
                        {cls}
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
                    <SelectItem value="justified">Justifiées</SelectItem>
                    <SelectItem value="unjustified">Non justifiées</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
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

          {/* Absences Table */}
          <Card>
            <CardHeader>
              <CardTitle>Absences récentes ({filteredAbsences.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Signalé par</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAbsences.map((absence) => (
                    <TableRow key={absence.id}>
                      <TableCell className="font-medium">{absence.studentName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{absence.class}</Badge>
                      </TableCell>
                      <TableCell>{new Date(absence.date).toLocaleDateString("fr-FR")}</TableCell>
                      <TableCell>{absence.period}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(absence.isJustified)}
                          {getStatusBadge(absence.isJustified)}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{absence.reason}</TableCell>
                      <TableCell>{absence.reportedBy}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {absence.isJustified === null && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                                Justifier
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                                Refuser
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredAbsences.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune absence trouvée avec ces critères</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
