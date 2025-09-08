"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Plus, Search, Mail, MailOpen, Reply } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TeacherMessages() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - will be replaced with real API calls
  const messages = [
    {
      id: "1",
      senderName: "Mme Durand",
      senderRole: "parent",
      subject: "Question sur les devoirs de mathématiques",
      preview: "Bonjour, j'aimerais avoir des précisions sur les exercices...",
      date: "2024-01-15T10:30:00",
      isRead: false,
      hasAttachment: false,
    },
    {
      id: "2",
      senderName: "M. Martin",
      senderRole: "parent",
      subject: "Absence de Lucas demain",
      preview: "Bonjour, je vous informe que Lucas sera absent demain...",
      date: "2024-01-14T16:45:00",
      isRead: true,
      hasAttachment: true,
    },
    {
      id: "3",
      senderName: "Direction",
      senderRole: "admin",
      subject: "Réunion pédagogique - Vendredi 19 janvier",
      preview: "Rappel de la réunion pédagogique prévue vendredi...",
      date: "2024-01-13T09:15:00",
      isRead: true,
      hasAttachment: false,
    },
    {
      id: "4",
      senderName: "Mme Petit",
      senderRole: "parent",
      subject: "Félicitations pour Thomas",
      preview: "Je tenais à vous remercier pour votre accompagnement...",
      date: "2024-01-12T14:20:00",
      isRead: false,
      hasAttachment: false,
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => !m.isRead).length

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    }
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "parent":
        return <Badge variant="secondary">Parent</Badge>
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Administration</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">
                Communiquez avec les parents et l'administration
                {unreadCount > 0 && (
                  <span className="ml-2 text-blue-600 font-medium">
                    ({unreadCount} non lu{unreadCount > 1 ? "s" : ""})
                  </span>
                )}
              </p>
            </div>
            <Link href="/teacher/messages/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau message
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Boîte de réception
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !message.isRead ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {message.senderName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <p className={`text-sm font-medium ${!message.isRead ? "font-bold" : ""}`}>
                                  {message.senderName}
                                </p>
                                {getRoleBadge(message.senderRole)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                                {!message.isRead ? (
                                  <Mail className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <MailOpen className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            </div>
                            <p className={`text-sm mb-1 ${!message.isRead ? "font-semibold" : ""}`}>
                              {message.subject}
                            </p>
                            <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3 space-x-2">
                          <Button variant="outline" size="sm">
                            <Reply className="mr-2 h-4 w-4" />
                            Répondre
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {filteredMessages.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucun message trouvé</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/teacher/messages/new">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau message
                    </Button>
                  </Link>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Marquer tout lu
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Messages reçus</span>
                      <span className="font-semibold">{messages.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Non lus</span>
                      <span className="font-semibold text-blue-600">{unreadCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">De parents</span>
                      <span className="font-semibold">{messages.filter((m) => m.senderRole === "parent").length}</span>
                    </div>
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
