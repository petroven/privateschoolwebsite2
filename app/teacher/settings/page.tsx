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

export default function TeacherSettingsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Paramètres Professeur</h1>
          <p className="text-gray-600">Gérez vos préférences d'enseignement</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="teaching">Enseignement</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil Professeur</CardTitle>
              <CardDescription>Vos informations professionnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Changer la photo</Button>
                  <p className="text-sm text-gray-500">Photo visible par les élèves et parents</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Marie" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Professeur" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Matière principale</Label>
                <Input id="subject" defaultValue="Mathématiques" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Spécialisation</Label>
                <Input id="specialization" defaultValue="Algèbre et Géométrie" />
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
              <CardTitle>Notifications Professeur</CardTitle>
              <CardDescription>Gérez vos alertes pédagogiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Nouveaux devoirs rendus",
                "Messages des parents",
                "Absences d'élèves",
                "Réunions pédagogiques",
                "Rappels d'évaluations",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <Label className="font-normal">{item}</Label>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teaching">
          <Card>
            <CardHeader>
              <CardTitle>Préférences d'enseignement</CardTitle>
              <CardDescription>Configurez vos outils pédagogiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notation sur 20</Label>
                    <p className="text-sm text-gray-500">Utiliser le système de notation français</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Commentaires automatiques</Label>
                    <p className="text-sm text-gray-500">Suggestions de commentaires basées sur les notes</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rappels de devoirs</Label>
                    <p className="text-sm text-gray-500">Envoyer des rappels aux élèves</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Délai de rendu par défaut (jours)</Label>
                <Input type="number" defaultValue="7" min="1" max="30" />
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
