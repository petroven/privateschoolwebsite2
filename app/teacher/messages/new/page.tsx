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
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewMessage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipientType: "",
    recipients: [] as string[],
    subject: "",
    message: "",
    priority: "normal",
    requestReadReceipt: false,
    sendCopy: false,
  })

  // Mock data - replace with actual API calls
  const parentContacts = [
    { id: "1", name: "Mme Durand", email: "durand@example.fr", children: ["Emma Dubois"] },
    { id: "2", name: "M. Martin", email: "martin@example.fr", children: ["Lucas Martin"] },
    { id: "3", name: "Mme Petit", email: "petit@example.fr", children: ["Sophie Durand"] },
  ]

  const adminContacts = [
    { id: "admin1", name: "Direction", email: "direction@sainte-marie.fr" },
    { id: "admin2", name: "Secrétariat", email: "secretariat@sainte-marie.fr" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Sending message:", formData)
      router.push("/teacher/messages")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecipientToggle = (recipientId: string) => {
    setFormData((prev) => ({
      ...prev,
      recipients: prev.recipients.includes(recipientId)
        ? prev.recipients.filter((id) => id !== recipientId)
        : [...prev.recipients, recipientId],
    }))
  }

  const getAvailableRecipients = () => {
    switch (formData.recipientType) {
      case "parents":
        return parentContacts
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
      router.push("/teacher/messages")
    } catch (error) {
      console.error("Error saving draft:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/teacher/messages">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouveau Message</h1>
              <p className="text-gray-600">Envoyer un message aux parents ou à l'administration</p>
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
                      Destinataires
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="recipientType">Type de destinataire *</Label>
                      <Select
                        value={formData.recipientType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, recipientType: value, recipients: [] }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type de destinataire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parents">Parents d'élèves</SelectItem>
                          <SelectItem value="admin">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.recipientType && (
                      <div>
                        <Label>Sélectionner les destinataires *</Label>
                        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                          {getAvailableRecipients().map((contact) => (
                            <div key={contact.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={contact.id}
                                checked={formData.recipients.includes(contact.id)}
                                onCheckedChange={() => handleRecipientToggle(contact.id)}
                              />
                              <Label htmlFor={contact.id} className="flex-1 cursor-pointer">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{contact.name}</span>
                                  <span className="text-sm text-gray-500">{contact.email}</span>
                                </div>
                                {formData.recipientType === "parents" && "children" in contact && (
                                  <div className="text-xs text-gray-400 mt-1">
                                    Enfant(s): {contact.children.join(", ")}
                                  </div>
                                )}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {formData.recipients.length > 0 && (
                          <p className="text-sm text-gray-600 mt-2">
                            {formData.recipients.length} destinataire(s) sélectionné(s)
                          </p>
                        )}
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
                          subject: "Information importante",
                          message: "Bonjour,\n\nJe vous contacte concernant...\n\nCordialement,\n[Votre nom]",
                        }))
                      }
                    >
                      Message d'information
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: "Rendez-vous demandé",
                          message:
                            "Bonjour,\n\nJe souhaiterais programmer un rendez-vous pour discuter de...\n\nCordialement,\n[Votre nom]",
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
                          subject: "Félicitations",
                          message: "Bonjour,\n\nJe tenais à vous féliciter pour...\n\nCordialement,\n[Votre nom]",
                        }))
                      }
                    >
                      Message de félicitations
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={isLoading || formData.recipients.length === 0} className="w-full">
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

                  <Link href="/teacher/messages">
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
