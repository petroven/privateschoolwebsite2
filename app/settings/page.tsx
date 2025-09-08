"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Bell, Shield, Palette, Database } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Gérez vos préférences et paramètres du compte</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Apparence
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Système
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles et votre photo de profil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Changer la photo</Button>
                  <p className="text-sm text-gray-500">JPG, PNG ou GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Jean" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Dupont" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="+33 1 23 45 67 89" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea id="bio" placeholder="Parlez-nous de vous..." className="min-h-[100px]" />
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié des activités importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-gray-500">Recevez des emails pour les mises à jour importantes</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notifications push</Label>
                    <p className="text-sm text-gray-500">Recevez des notifications dans votre navigateur</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notifications SMS</Label>
                    <p className="text-sm text-gray-500">Recevez des SMS pour les urgences</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Types de notifications</h4>
                <div className="space-y-3">
                  {[
                    "Nouvelles notes disponibles",
                    "Absences signalées",
                    "Nouveaux messages",
                    "Événements à venir",
                    "Devoirs à rendre",
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <Label className="font-normal">{item}</Label>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer les préférences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>Gérez votre mot de passe et les paramètres de sécurité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Changer le mot de passe</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
                <CardDescription>Ajoutez une couche de sécurité supplémentaire à votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">2FA activée</p>
                    <p className="text-sm text-gray-500">
                      Votre compte est protégé par l'authentification à deux facteurs
                    </p>
                  </div>
                  <Badge variant="secondary">Activée</Badge>
                </div>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Configurer 2FA
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de votre interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Thème</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["Clair", "Sombre", "Système"].map((theme) => (
                    <div key={theme} className="flex items-center space-x-2">
                      <input type="radio" name="theme" id={theme.toLowerCase()} defaultChecked={theme === "Système"} />
                      <Label htmlFor={theme.toLowerCase()}>{theme}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Langue</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="space-y-3">
                <Label>Taille de police</Label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Petite</span>
                  <input type="range" className="flex-1" min="12" max="18" defaultValue="14" />
                  <span className="text-lg">Grande</span>
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Appliquer les changements"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations système</CardTitle>
                <CardDescription>Détails sur votre compte et l'utilisation du système</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Rôle</Label>
                    <p className="text-lg">Administrateur</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Dernière connexion</Label>
                    <p className="text-lg">Aujourd'hui à 14:30</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Compte créé</Label>
                    <p className="text-lg">15 janvier 2024</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Statut</Label>
                    <Badge variant="default">Actif</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestion des données</CardTitle>
                <CardDescription>Exportez ou supprimez vos données personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Exporter mes données</p>
                    <p className="text-sm text-gray-500">Téléchargez une copie de toutes vos données</p>
                  </div>
                  <Button variant="outline">Exporter</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">Supprimer mon compte</p>
                    <p className="text-sm text-gray-500">Supprimez définitivement votre compte et toutes vos données</p>
                  </div>
                  <Button variant="destructive">Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
