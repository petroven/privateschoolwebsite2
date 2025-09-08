"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Plus, Search, Mail, MailOpen, Reply, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ParentMessages() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - will be replaced with real API calls
  const messages = [
    {
      id: "1",
      senderName: "Prof. Martin",
      senderRole: "teacher",
      subject: "Résultats du contrôle de mathématiques",
      preview: "Bonjour, je souhaitais vous informer des excellents résultats d'Emma...",
      date: "2024-01-15T14:30:00",
      isRead: false,
      childName: "Emma Dubois",
      hasAttachment: false,
    },
    {
      id: "2",
      senderName: "Mme Petit",
      senderRole: "teacher",
      subject: "Comportement de Lucas en classe",
      preview: "Je tenais à vous faire part de l'amélioration du comportement de Lucas...",
      date: "2024-01-14T16:45:00",
      isRead: true,
      childName: "Lucas Dubois",
      hasAttachment: false,
    },
    {
      id: "3",
      senderName: "Direction",
      senderRole: "admin",
      subject: "Réunion parents-professeurs",
      preview: "Nous avons le plaisir de vous inviter à la réunion parents-professeurs...",
      date: "2024-01-13T09:15:00",
      isRead: true,
      childName: null,
      hasAttachment: true,
    },
    {
      id: "4",
      senderName: "Prof. Martin",
      senderRole: "teacher",
      subject: "Sortie scolaire - Autorisation requise",
      preview: "Dans le cadre de notre projet pédagogique, nous organisons une sortie...",
      date: "2024-01-12T11:20:00",
      isRead: false,
      childName: "Emma Dubois",
      hasAttachment: true,
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.childName && message.childName.toLowerCase().includes(searchTerm.toLowerCase())),
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
      case "teacher":
        return <Badge className="bg-blue-100 text-blue-800">Professeur</Badge>
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Administration</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getMessagesByCategory = () => {
    const teacherMessages = filteredMessages.filter((m) => m.senderRole === "teacher")
    const adminMessages = filteredMessages.filter((m) => m.senderRole === "admin")

    return { teacherMessages, adminMessages }
  }

  const { teacherMessages, adminMessages } = getMessagesByCategory()

  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">
                Communiquez avec les professeurs et l'administration
                {unreadCount > 0 && (
                  <span className="ml-2 text-blue-600 font-medium">
                    ({unreadCount} non lu{unreadCount > 1 ? "s" : ""})
                  </span>
                )}
              </p>
            </div>
            <Link href="/parent/messages/new">
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
                    {filteredMessages
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((message) => (
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
                                  {message.childName && (
                                    <Badge variant="outline" className="text-xs">
                                      {message.childName}
                                    </Badge>
                                  )}
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

            {/* Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/parent/messages/new">
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
                      <span className="text-sm text-gray-600">De professeurs</span>
                      <span className="font-semibold">{teacherMessages.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">De l'administration</span>
                      <span className="font-semibold">{adminMessages.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contacts fréquents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">PM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Prof. Martin</p>
                        <p className="text-xs text-gray-500">CM2 A - Emma</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">MP</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Mme Petit</p>
                        <p className="text-xs text-gray-500">CE2 B - Lucas</p>
                      </div>
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
