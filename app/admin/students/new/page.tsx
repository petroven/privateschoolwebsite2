"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, User, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NewStudent() {
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    studentNumber: "",
    classId: "",
    parentId: "",
    address: "",
    medicalInfo: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  })
  const [parentData, setParentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    relationship: "parent",
    address: "",
  })
  const [createNewParent, setCreateNewParent] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - will be replaced with real API calls
  const classes = [
    { id: "1", name: "CM2 A", teacher: "Mme Martin" },
    { id: "2", name: "CM2 B", teacher: "M. Durand" },
    { id: "3", name: "CM1 A", teacher: "Mme Petit" },
    { id: "4", name: "CE2 A", teacher: "M. Bernard" },
    { id: "5", name: "CE1 A", teacher: "Mme Rousseau" },
    { id: "6", name: "CP A", teacher: "Mme Leroy" },
  ]

  const existingParents = [
    { id: "1", name: "Sophie Durand", email: "s.durand@example.fr", phone: "06 12 34 56 78" },
    { id: "2", name: "Jean Rousseau", email: "j.rousseau@example.fr", phone: "06 98 76 54 32" },
    { id: "3", name: "Anne Petit", email: "a.petit@example.fr", phone: "01 45 67 89 12" },
  ]

  const relationships = [
    { value: "parent", label: "Parent" },
    { value: "tuteur", label: "Tuteur légal" },
    { value: "grand-parent", label: "Grand-parent" },
    { value: "autre", label: "Autre" },
  ]

  const handleStudentChange = (field: string, value: string) => {
    setStudentData((prev) => ({ ...prev, [field]: value }))
  }

  const handleParentChange = (field: string, value: string) => {
    setParentData((prev) => ({ ...prev, [field]: value }))
  }

  const generateStudentNumber = () => {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${year}${random}`
  }

  const validateForm = () => {
    if (!studentData.firstName || !studentData.lastName || !studentData.dateOfBirth || !studentData.classId) {
      setError("Veuillez remplir tous les champs obligatoires de l'élève")
      return false
    }

    if (createNewParent) {
      if (!parentData.firstName || !parentData.lastName || !parentData.email || !parentData.phone) {
        setError("Veuillez remplir tous les champs obligatoires du parent/tuteur")
        return false
      }
    } else {
      if (!studentData.parentId) {
        setError("Veuillez sélectionner un parent existant")
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Generate student number if not provided
      const finalStudentData = {
        ...studentData,
        studentNumber: studentData.studentNumber || generateStudentNumber(),
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Creating student:", {
        student: finalStudentData,
        parent: createNewParent ? parentData : { id: studentData.parentId },
        createNewParent,
      })

      // Redirect to students list
      window.location.href = "/admin/students"
    } catch (err) {
      setError("Une erreur est survenue lors de la création de l'élève")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/students">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Nouvel Élève</h1>
              <p className="text-gray-600 dark:text-gray-400">Ajouter un nouvel élève à l'école</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations de l'élève
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={studentData.firstName}
                      onChange={(e) => handleStudentChange("firstName", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={studentData.lastName}
                      onChange={(e) => handleStudentChange("lastName", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={studentData.dateOfBirth}
                      onChange={(e) => handleStudentChange("dateOfBirth", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentNumber">Numéro d'élève</Label>
                    <Input
                      id="studentNumber"
                      value={studentData.studentNumber}
                      onChange={(e) => handleStudentChange("studentNumber", e.target.value)}
                      placeholder="Généré automatiquement si vide"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="class">Classe *</Label>
                  <Select value={studentData.classId} onValueChange={(value) => handleStudentChange("classId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} - {cls.teacher}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    value={studentData.address}
                    onChange={(e) => handleStudentChange("address", e.target.value)}
                    disabled={isLoading}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                    <Input
                      id="emergencyContact"
                      value={studentData.emergencyContact}
                      onChange={(e) => handleStudentChange("emergencyContact", e.target.value)}
                      placeholder="Nom du contact"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={studentData.emergencyPhone}
                      onChange={(e) => handleStudentChange("emergencyPhone", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="medicalInfo">Informations médicales</Label>
                  <Textarea
                    id="medicalInfo"
                    value={studentData.medicalInfo}
                    onChange={(e) => handleStudentChange("medicalInfo", e.target.value)}
                    placeholder="Allergies, traitements, informations importantes..."
                    disabled={isLoading}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={studentData.notes}
                    onChange={(e) => handleStudentChange("notes", e.target.value)}
                    placeholder="Informations complémentaires..."
                    disabled={isLoading}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Parent/Tuteur légal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={createNewParent ? "default" : "outline"}
                    onClick={() => setCreateNewParent(true)}
                    disabled={isLoading}
                  >
                    Nouveau parent
                  </Button>
                  <Button
                    type="button"
                    variant={!createNewParent ? "default" : "outline"}
                    onClick={() => setCreateNewParent(false)}
                    disabled={isLoading}
                  >
                    Parent existant
                  </Button>
                </div>

                {createNewParent ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parentFirstName">Prénom *</Label>
                        <Input
                          id="parentFirstName"
                          value={parentData.firstName}
                          onChange={(e) => handleParentChange("firstName", e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="parentLastName">Nom *</Label>
                        <Input
                          id="parentLastName"
                          value={parentData.lastName}
                          onChange={(e) => handleParentChange("lastName", e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parentEmail">Email *</Label>
                        <Input
                          id="parentEmail"
                          type="email"
                          value={parentData.email}
                          onChange={(e) => handleParentChange("email", e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="parentPhone">Téléphone *</Label>
                        <Input
                          id="parentPhone"
                          type="tel"
                          value={parentData.phone}
                          onChange={(e) => handleParentChange("phone", e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="relationship">Lien de parenté</Label>
                        <Select
                          value={parentData.relationship}
                          onValueChange={(value) => handleParentChange("relationship", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {relationships.map((rel) => (
                              <SelectItem key={rel.value} value={rel.value}>
                                {rel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="parentAddress">Adresse</Label>
                      <Textarea
                        id="parentAddress"
                        value={parentData.address}
                        onChange={(e) => handleParentChange("address", e.target.value)}
                        disabled={isLoading}
                        rows={2}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="existingParent">Sélectionner un parent existant *</Label>
                    <Select
                      value={studentData.parentId}
                      onValueChange={(value) => handleStudentChange("parentId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un parent" />
                      </SelectTrigger>
                      <SelectContent>
                        {existingParents.map((parent) => (
                          <SelectItem key={parent.id} value={parent.id}>
                            {parent.name} - {parent.email} - {parent.phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Link href="/admin/students">
                <Button variant="outline" disabled={isLoading}>
                  Annuler
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Création...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Créer l'élève
                  </>
                )}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  )
}
