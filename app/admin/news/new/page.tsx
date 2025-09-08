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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Newspaper, Eye, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewNews() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    priority: "normal",
    publishDate: "",
    expiryDate: "",
    isPublished: false,
    sendNotification: true,
    targetAudience: [] as string[],
    attachments: [] as File[],
  })

  const categories = [
    "Actualités générales",
    "Événements",
    "Pédagogie",
    "Vie scolaire",
    "Administratif",
    "Sorties et voyages",
    "Santé et sécurité",
  ]

  const audienceOptions = [
    { id: "parents", label: "Parents" },
    { id: "teachers", label: "Professeurs" },
    { id: "students", label: "Élèves" },
    { id: "admin", label: "Administration" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Creating news:", formData)
      router.push("/admin/news")
    } catch (error) {
      console.error("Error creating news:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAudienceToggle = (audience: string) => {
    setFormData((prev) => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter((a) => a !== audience)
        : [...prev.targetAudience, audience],
    }))
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      // Mock API call for saving draft
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Saving draft:", { ...formData, isPublished: false })
      router.push("/admin/news")
    } catch (error) {
      console.error("Error saving draft:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    setFormData((prev) => ({ ...prev, isPublished: true }))
    // The form submission will handle the actual publishing
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/news">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouvelle Actualité</h1>
              <p className="text-gray-600">Créer une nouvelle actualité</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Newspaper className="h-5 w-5" />
                      Contenu de l'actualité
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        placeholder="Titre de l'actualité"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Résumé</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Résumé court de l'actualité (affiché dans la liste)"
                        value={formData.excerpt}
                        onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Contenu *</Label>
                      <Textarea
                        id="content"
                        placeholder="Contenu complet de l'actualité"
                        value={formData.content}
                        onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                        rows={12}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Public cible</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {audienceOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={formData.targetAudience.includes(option.id)}
                            onCheckedChange={() => handleAudienceToggle(option.id)}
                          />
                          <Label htmlFor={option.id} className="text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priorité</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="normal">Normale</SelectItem>
                          <SelectItem value="high">Élevée</SelectItem>
                          <SelectItem value="urgent">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="publishDate">Date de publication</Label>
                      <Input
                        id="publishDate"
                        type="datetime-local"
                        value={formData.publishDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, publishDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiryDate">Date d'expiration</Label>
                      <Input
                        id="expiryDate"
                        type="datetime-local"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sendNotification"
                        checked={formData.sendNotification}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sendNotification: !!checked }))}
                      />
                      <Label htmlFor="sendNotification">Envoyer une notification</Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3">
                  <Button type="button" onClick={handlePublish} disabled={isLoading} className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {isLoading ? "Publication..." : "Publier maintenant"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isLoading}
                    className="w-full bg-transparent"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder en brouillon
                  </Button>

                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Aperçu
                  </Button>

                  <Link href="/admin/news">
                    <Button variant="outline" className="w-full bg-transparent">
                      Annuler
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  )
}
