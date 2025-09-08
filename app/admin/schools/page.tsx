"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Calendar,
  Settings,
  Save,
  Upload,
  ImageIcon,
} from "lucide-react"
import { useState } from "react"

export default function AdminSchools() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock data - will be replaced with real API calls
  const [schoolData, setSchoolData] = useState({
    name: "École Sainte-Marie",
    address: "123 Rue de la Paix, 75001 Paris",
    phone: "01 42 36 12 34",
    email: "contact@sainte-marie.fr",
    website: "www.sainte-marie.fr",
    description:
      "École privée catholique fondée en 1950, offrant un enseignement de qualité du CP au CM2 dans un environnement bienveillant et stimulant.",
    logoUrl: "/generic-school-logo.png",
    academicYear: "2024-2025",
    establishedYear: "1950",
    capacity: 200,
    currentStudents: 128,
  })

  const stats = {
    totalClasses: 8,
    totalTeachers: 12,
    totalStudents: 128,
    averageClassSize: 16,
  }

  const schoolSettings = {
    gradeScale: "20",
    passingGrade: "10",
    attendanceRequired: "90",
    termDuration: "Trimestre",
    vacationPeriods: [
      { name: "Vacances de Toussaint", start: "2024-10-19", end: "2024-11-04" },
      { name: "Vacances de Noël", start: "2024-12-21", end: "2025-01-06" },
      { name: "Vacances d'hiver", start: "2025-02-15", end: "2025-03-03" },
      { name: "Vacances de printemps", start: "2025-04-12", end: "2025-04-28" },
      { name: "Vacances d'été", start: "2025-07-05", end: "2025-09-01" },
    ],
  }

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setSchoolData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration de l'École</h1>
              <p className="text-gray-600">Gérez les informations et paramètres de votre établissement</p>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              )}
            </div>
          </div>

          {/* School Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Classes</p>
                    <p className="text-2xl font-bold">{stats.totalClasses}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Professeurs</p>
                    <p className="text-2xl font-bold">{stats.totalTeachers}</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Élèves</p>
                    <p className="text-2xl font-bold">{stats.totalStudents}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Capacité</p>
                    <p className="text-2xl font-bold">
                      {Math.round((stats.totalStudents / schoolData.capacity) * 100)}%
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* School Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolName">Nom de l'école</Label>
                      <Input
                        id="schoolName"
                        value={schoolData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="academicYear">Année scolaire</Label>
                      <Input
                        id="academicYear"
                        value={schoolData.academicYear}
                        onChange={(e) => handleInputChange("academicYear", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={schoolData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={schoolData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={schoolData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      value={schoolData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={schoolData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="established">Année de fondation</Label>
                      <Input
                        id="established"
                        value={schoolData.establishedYear}
                        onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacité d'accueil</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={schoolData.capacity}
                        onChange={(e) => handleInputChange("capacity", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres académiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Échelle de notation</Label>
                      <Input value={`/${schoolSettings.gradeScale}`} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label>Note de passage</Label>
                      <Input
                        value={`${schoolSettings.passingGrade}/${schoolSettings.gradeScale}`}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label>Assiduité requise</Label>
                      <Input value={`${schoolSettings.attendanceRequired}%`} disabled={!isEditing} />
                    </div>
                  </div>

                  <div>
                    <Label>Système d'évaluation</Label>
                    <Input value={schoolSettings.termDuration} disabled={!isEditing} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Logo and Quick Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Logo de l'école
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={schoolData.logoUrl || "/placeholder.svg"}
                        alt="Logo de l'école"
                        className="w-20 h-20 object-contain rounded"
                      />
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Changer le logo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{schoolData.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{schoolData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{schoolData.email}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Élèves actuels:</span>
                      <Badge variant="secondary">{schoolData.currentStudents}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacité:</span>
                      <Badge variant="outline">{schoolData.capacity}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taux d'occupation:</span>
                      <Badge variant="default">
                        {Math.round((schoolData.currentStudents / schoolData.capacity) * 100)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vacation Periods */}
              <Card>
                <CardHeader>
                  <CardTitle>Périodes de vacances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schoolSettings.vacationPeriods.map((period, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm">{period.name}</p>
                        <p className="text-xs text-gray-600">
                          Du {new Date(period.start).toLocaleDateString("fr-FR")} au{" "}
                          {new Date(period.end).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
