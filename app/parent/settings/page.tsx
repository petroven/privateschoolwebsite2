"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings } from "lucide-react"

export default function ParentSettingsPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres Parent</h1>
          <p className="text-gray-600">Gérez le suivi de vos enfants</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="children">Enfants</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil Parent</CardTitle>
              <CardDescription>Vos informations de contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>PD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Changer la photo</Button>
                  <p className="text-sm text-gray-500">Photo visible par l'école</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Pierre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Dupont" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email principal</Label>
                <Input id="email" type="email" defaultValue="pierre.dupont@example.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="+33 1 23 45 67 89" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                  <Input id="emergencyPhone" defaultValue="+33 6 12 34 56 78" />
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications Parent</CardTitle>
              <CardDescription>Restez informé de la scolarité de vos enfants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Nouvelles notes",
                "Absences signalées",
                "Messages des professeurs",
                "Événements scolaires",
                "Devoirs non rendus",
                "Bulletins disponibles",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <Label className="font-normal">{item}</Label>
                  <Switch defaultChecked />
                </div>
              ))}

              <div className="border-t pt-4 space-y-4">
                <h4 className="font-medium">Fréquence des résumés</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="frequency" id="daily" />
                    <Label htmlFor="daily">Quotidien</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="frequency" id="weekly" defaultChecked />
                    <Label htmlFor="weekly">Hebdomadaire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="frequency" id="monthly" />
                    <Label htmlFor="monthly">Mensuel</Label>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des enfants</CardTitle>
              <CardDescription>Informations sur vos enfants scolarisés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { name: "Emma Dupont", class: "CM2 A", status: "Actif" },
                  { name: "Lucas Dupont", class: "6ème B", status: "Actif" },
                ].map((child, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{child.name}</p>
                        <p className="text-sm text-gray-500">{child.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">{child.status}</span>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Autorisations</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Autorisation de sortie anticipée</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Partage des photos scolaires</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Contact par SMS</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
