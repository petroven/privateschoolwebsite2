"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NewHomework() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    className: "",
    subject: "",
    dueDate: "",
    estimatedDuration: "",
    type: "exercise",
    isPublished: false,
  })

  const handleSubmit = (e: React.FormEvent, publish = false) => {
    e.preventDefault()
    console.log("[v0] Submitting homework:", { ...formData, isPublished: publish })
    // Here you would typically send the data to your API
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/teacher/homework">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Nouveau Devoir</h1>
              <p className="text-muted-foreground">Créez un nouveau devoir pour vos élèves</p>
            </div>
          </div>

          <form onSubmit={(e) => handleSubmit(e, formData.isPublished)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre du devoir *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Exercices de mathématiques - Chapitre 5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Décrivez le devoir en détail..."
                        rows={4}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="className">Classe *</Label>
                        <Select
                          value={formData.className}
                          onValueChange={(value) => setFormData({ ...formData, className: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CM2 A">CM2 A</SelectItem>
                            <SelectItem value="CM2 B">CM2 B</SelectItem>
                            <SelectItem value="CM1 A">CM1 A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subject">Matière *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => setFormData({ ...formData, subject: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une matière" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                            <SelectItem value="Français">Français</SelectItem>
                            <SelectItem value="Sciences">Sciences</SelectItem>
                            <SelectItem value="Histoire-Géographie">Histoire-Géographie</SelectItem>
                            <SelectItem value="Anglais">Anglais</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dueDate">Date d'échéance *</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={formData.dueDate}
                          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="estimatedDuration">Durée estimée (minutes)</Label>
                        <Input
                          id="estimatedDuration"
                          type="number"
                          value={formData.estimatedDuration}
                          onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                          placeholder="30"
                          min="1"
                          max="300"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="type">Type de devoir</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exercise">Exercice</SelectItem>
                          <SelectItem value="reading">Lecture</SelectItem>
                          <SelectItem value="project">Projet</SelectItem>
                          <SelectItem value="lesson">Leçon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                      />
                      <Label htmlFor="isPublished">Publier immédiatement</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.isPublished
                        ? "Le devoir sera visible par les élèves et leurs parents"
                        : "Le devoir sera sauvegardé en brouillon"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button type="submit" className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      {formData.isPublished ? "Publier" : "Sauvegarder"}
                    </Button>
                    {!formData.isPublished && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={(e) => handleSubmit(e, true)}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Sauvegarder et publier
                      </Button>
                    )}
                    <Link href="/teacher/homework">
                      <Button variant="outline" className="w-full bg-transparent">
                        Annuler
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  )
}
