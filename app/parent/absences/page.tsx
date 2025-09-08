"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Calendar, AlertTriangle, FileText } from "lucide-react"
import { useState } from "react"

export default function ParentAbsences() {
  const [selectedChild, setSelectedChild] = useState("1")

  // Mock data - will be replaced with real API calls
  const children = [
    { id: "1", name: "Emma Dubois", class: "CM2 A" },
    { id: "2", name: "Lucas Dubois", class: "CE2 B" },
  ]

  const absences = [
    {
      id: "1",
      childId: "1",
      date: "2024-01-15",
      period: "Matinée",
      isJustified: true,
      reason: "Rendez-vous médical",
      justificationDocument: "certificat_medical.pdf",
      reportedBy: "Prof. Martin",
      reportedAt: "2024-01-15T08:30:00",
    },
    {
      id: "2",
      childId: "2",
      date: "2024-01-10",
      period: "Journée complète",
      isJustified: false,
      reason: "Maladie",
      justificationDocument: null,
      reportedBy: "Mme Petit",
      reportedAt: "2024-01-10T09:00:00",
    },
    {
      id: "3",
      childId: "2",
      date: "2024-01-08",
      period: "Après-midi",
      isJustified: null,
      reason: "Rendez-vous dentiste",
      justificationDocument: null,
      reportedBy: "Mme Petit",
      reportedAt: "2024-01-08T14:00:00",
    },
  ]

  const filteredAbsences = absences.filter((absence) => absence.childId === selectedChild)
  const selectedChildData = children.find((child) => child.id === selectedChild)

  // Calculate statistics
  const totalAbsences = filteredAbsences.length
  const justifiedAbsences = filteredAbsences.filter((a) => a.isJustified === true).length
  const unjustifiedAbsences = filteredAbsences.filter((a) => a.isJustified === false).length
  const pendingAbsences = filteredAbsences.filter((a) => a.isJustified === null).length

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
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Absences</h1>
            <p className="text-gray-600">Consultez et gérez les absences de vos enfants</p>
          </div>

          {/* Child Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sélection de l'enfant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <Select value={selectedChild} onValueChange={setSelectedChild}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name} - {child.class}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total absences</p>
                    <p className="text-2xl font-bold">{totalAbsences}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Justifiées</p>
                    <p className="text-2xl font-bold text-green-600">{justifiedAbsences}</p>
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
                    <p className="text-2xl font-bold text-red-600">{unjustifiedAbsences}</p>
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
                    <p className="text-2xl font-bold text-orange-600">{pendingAbsences}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Justifications Alert */}
          {pendingAbsences > 0 && (
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">
                      Vous avez {pendingAbsences} absence(s) en attente de justification
                    </p>
                    <p className="text-sm text-orange-700">
                      Veuillez fournir les justificatifs nécessaires pour éviter que ces absences soient marquées comme
                      non justifiées.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Absences Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des absences - {selectedChildData?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Motif</TableHead>
                    <TableHead>Justificatif</TableHead>
                    <TableHead>Signalé par</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAbsences
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((absence) => (
                      <TableRow key={absence.id}>
                        <TableCell className="font-medium">
                          {new Date(absence.date).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>{absence.period}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(absence.isJustified)}
                            {getStatusBadge(absence.isJustified)}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{absence.reason}</TableCell>
                        <TableCell>
                          {absence.justificationDocument ? (
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                                {absence.justificationDocument}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Aucun</span>
                          )}
                        </TableCell>
                        <TableCell>{absence.reportedBy}</TableCell>
                        <TableCell>
                          {absence.isJustified === null && (
                            <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                              <FileText className="mr-2 h-4 w-4" />
                              Justifier
                            </Button>
                          )}
                          {absence.isJustified === false && (
                            <Button variant="outline" size="sm" className="text-orange-600 bg-transparent">
                              <FileText className="mr-2 h-4 w-4" />
                              Ajouter justificatif
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {filteredAbsences.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune absence enregistrée pour cet enfant</p>
                  <p className="text-sm text-gray-400">Excellente assiduité !</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
