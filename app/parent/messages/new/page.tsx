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
import { ArrowLeft, Send, MessageSquare, Mail } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function NewParentMessage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipientType: "",
    recipientId: "",
    childId: "",
    subject: "",
    message: "",
    priority: "normal",
    requestReadReceipt: false,
    sendCopy: false,
  })

  // Mock data - replace with actual API calls
  const children = [
    { id: "1", name: "Emma Dubois", class: "CM2 A", teacher: "Prof. Martin" },
    { id: "2", name: "Lucas Dubois", class: "CE2 B", teacher: "Mme Petit" },
  ]

  const teachers = [
    { id: "teacher1", name: "Prof. Martin", email: "prof.martin@sainte-marie.fr", classes: ["CM2 A"] },
    { id: "teacher2", name: "Mme Petit", email: "mme.petit@sainte-marie.fr", classes: ["CE2 B"] },
  ]

  const adminContacts = [
    { id: "admin1", name: "Direction", email: "direction@sainte-marie.fr" },
    { id: "admin2", name: "Secrétariat", email: "secretariat@sainte-marie.fr" },
  ]

  // Pre-fill teacher if coming from child detail page
  useEffect(() => {
    const teacherEmail = searchParams.get("teacher")
    if (teacherEmail) {
      const teacher = teachers.find((t) => t.email === teacherEmail)
      if (teacher) {
        setFormData((prev) => ({
          ...prev,
          recipientType: "teacher",
          recipientId: teacher.id,
        }))
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Sending message:", formData)
      router.push("/parent/messages")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAvailableRecipients = () => {
    switch (formData.recipientType) {
      case "teacher":
        return teachers
      case "admin":
        return adminContacts
      default:
        return []
    }
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      // Mock API call for saving draft
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Saving draft:", formData)
      router.push("/parent/messages")
    } catch (error) {
      console.error("Error saving draft:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/parent/messages">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouveau Message</h1>
              <p className="text-gray-600">Contacter un professeur ou l'administration</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Destinataire
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="recipientType">Type de destinataire *</Label>
                      <Select
                        value={formData.recipientType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, recipientType: value, recipientId: "" }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type de destinataire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teacher">Professeur</SelectItem>
                          <SelectItem value="admin">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.recipientType && (
                      <div>
                        <Label htmlFor="recipientId">Destinataire *</Label>
                        <Select
                          value={formData.recipientId}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, recipientId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un destinataire" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableRecipients().map((recipient) => (
                              <SelectItem key={recipient.id} value={recipient.id}>
                                {recipient.name}
                                {formData.recipientType === "teacher" && "classes" in recipient && (
                                  <span className="text-gray-500 ml-2">({recipient.classes.join(", ")})</span>
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {formData.recipientType === "teacher" && (
                      <div>
                        <Label htmlFor="childId">Concernant l'enfant</Label>
                        <Select
                          value={formData.childId}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, childId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un enfant (optionnel)" />
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
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contenu du message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Objet *</Label>
                      <Input
                        id="subject"
                        placeholder="Objet du message"
                        value={formData.subject}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tapez votre message ici..."
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        rows={12}
                        required
                      />
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

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requestReadReceipt"
                          checked={formData.requestReadReceipt}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, requestReadReceipt: !!checked }))
                          }
                        />
                        <Label htmlFor="requestReadReceipt">Demander un accusé de lecture</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendCopy"
                          checked={formData.sendCopy}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sendCopy: !!checked }))}
                        />
                        <Label htmlFor="sendCopy">M'envoyer une copie</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Modèles rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: "Demande de rendez-vous",
                          message:
                            "Bonjour,\n\nJe souhaiterais programmer un rendez-vous pour discuter de la scolarité de mon enfant.\n\nMerci de me faire savoir vos disponibilités.\n\nCordialement,\n[Votre nom]",
                        }))
                      }
                    >
                      Demande de rendez-vous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: "Question sur les devoirs",
                          message:
                            "Bonjour,\n\nJ'aimerais avoir des précisions concernant les devoirs donnés à mon enfant.\n\nPouvez-vous m'éclairer sur...\n\nMerci d'avance,\n[Votre nom]",
                        }))
                      }
                    >
                      Question sur les devoirs
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: "Justification d'absence",
                          message:
                            "Bonjour,\n\nJe vous informe que mon enfant sera absent le [date] pour [raison].\n\nVeuillez trouver ci-joint le justificatif.\n\nCordialement,\n[Votre nom]",
                        }))
                      }
                    >
                      Justification d'absence
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: "Remerciements",
                          message:
                            "Bonjour,\n\nJe tenais à vous remercier pour votre accompagnement et votre dévouement envers mon enfant.\n\nVos efforts sont très appréciés.\n\nCordialement,\n[Votre nom]",
                        }))
                      }
                    >
                      Remerciements
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={isLoading || !formData.recipientId} className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {isLoading ? "Envoi..." : "Envoyer le message"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isLoading}
                    className="w-full bg-transparent"
                  >
                    Sauvegarder en brouillon
                  </Button>

                  <Link href="/parent/messages">
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
