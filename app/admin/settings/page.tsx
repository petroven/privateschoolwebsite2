"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Settings, School, Mail, Bell, Shield, Database, Save, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // School Information
    schoolName: "École Sainte-Marie",
    schoolAddress: "123 Rue de l'École, 75001 Paris",
    schoolPhone: "01 42 36 12 34",
    schoolEmail: "contact@sainte-marie.fr",
    schoolWebsite: "https://www.sainte-marie.fr",
    principalName: "Marie Dubois",

    // Academic Settings
    currentYear: "2024-2025",
    gradeScale: "20",
    passingGrade: "10",
    attendanceRequired: "90",

    // Email Settings
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@sainte-marie.fr",
    smtpPassword: "",
    emailFromName: "École Sainte-Marie",

    // Notification Settings
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    notifyAbsences: true,
    notifyGrades: true,
    notifyNews: true,
    notifyEvents: true,

    // Security Settings
    passwordMinLength: "8",
    requirePasswordChange: true,
    sessionTimeout: "60",
    enableTwoFactor: false,

    // System Settings
    timezone: "Europe/Paris",
    language: "fr",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",

    // Backup Settings
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving settings:", settings)
      // Show success message
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    // Reset to default values
    setSettings((prev) => ({ ...prev }))
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-6xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres Système</h1>
            <p className="text-gray-600">Configuration générale de l'établissement</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    <a href="#school" className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-700">
                      <School className="h-4 w-4" />
                      Établissement
                    </a>
                    <a href="#email" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                    <a href="#notifications" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </a>
                    <a href="#security" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                      <Shield className="h-4 w-4" />
                      Sécurité
                    </a>
                    <a href="#system" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                      <Settings className="h-4 w-4" />
                      Système
                    </a>
                    <a href="#backup" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                      <Database className="h-4 w-4" />
                      Sauvegarde
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* School Information */}
              <Card id="school">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    Informations de l'établissement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolName">Nom de l'établissement</Label>
                      <Input
                        id="schoolName"
                        value={settings.schoolName}
                        onChange={(e) => setSettings((prev) => ({ ...prev, schoolName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="principalName">Nom du directeur</Label>
                      <Input
                        id="principalName"
                        value={settings.principalName}
                        onChange={(e) => setSettings((prev) => ({ ...prev, principalName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="schoolAddress">Adresse</Label>
                    <Textarea
                      id="schoolAddress"
                      value={settings.schoolAddress}
                      onChange={(e) => setSettings((prev) => ({ ...prev, schoolAddress: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="schoolPhone">Téléphone</Label>
                      <Input
                        id="schoolPhone"
                        value={settings.schoolPhone}
                        onChange={(e) => setSettings((prev) => ({ ...prev, schoolPhone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="schoolEmail">Email</Label>
                      <Input
                        id="schoolEmail"
                        type="email"
                        value={settings.schoolEmail}
                        onChange={(e) => setSettings((prev) => ({ ...prev, schoolEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="schoolWebsite">Site web</Label>
                      <Input
                        id="schoolWebsite"
                        value={settings.schoolWebsite}
                        onChange={(e) => setSettings((prev) => ({ ...prev, schoolWebsite: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="currentYear">Année scolaire</Label>
                      <Input
                        id="currentYear"
                        value={settings.currentYear}
                        onChange={(e) => setSettings((prev) => ({ ...prev, currentYear: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gradeScale">Barème de notation</Label>
                      <Select
                        value={settings.gradeScale}
                        onValueChange={(value) => setSettings((prev) => ({ ...prev, gradeScale: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">Sur 20</SelectItem>
                          <SelectItem value="100">Sur 100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="passingGrade">Note de passage</Label>
                      <Input
                        id="passingGrade"
                        value={settings.passingGrade}
                        onChange={(e) => setSettings((prev) => ({ ...prev, passingGrade: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="attendanceRequired">Assiduité requise (%)</Label>
                      <Input
                        id="attendanceRequired"
                        value={settings.attendanceRequired}
                        onChange={(e) => setSettings((prev) => ({ ...prev, attendanceRequired: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Settings */}
              <Card id="email">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Configuration Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpServer">Serveur SMTP</Label>
                      <Input
                        id="smtpServer"
                        value={settings.smtpServer}
                        onChange={(e) => setSettings((prev) => ({ ...prev, smtpServer: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">Port SMTP</Label>
                      <Input
                        id="smtpPort"
                        value={settings.smtpPort}
                        onChange={(e) => setSettings((prev) => ({ ...prev, smtpPort: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpUsername">Nom d'utilisateur</Label>
                      <Input
                        id="smtpUsername"
                        value={settings.smtpUsername}
                        onChange={(e) => setSettings((prev) => ({ ...prev, smtpUsername: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">Mot de passe</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) => setSettings((prev) => ({ ...prev, smtpPassword: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="emailFromName">Nom d'expéditeur</Label>
                    <Input
                      id="emailFromName"
                      value={settings.emailFromName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, emailFromName: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card id="notifications">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Canaux de notification</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="enableEmailNotifications"
                            checked={settings.enableEmailNotifications}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, enableEmailNotifications: !!checked }))
                            }
                          />
                          <Label htmlFor="enableEmailNotifications">Notifications par email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="enableSmsNotifications"
                            checked={settings.enableSmsNotifications}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, enableSmsNotifications: !!checked }))
                            }
                          />
                          <Label htmlFor="enableSmsNotifications">Notifications par SMS</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Types de notifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notifyAbsences"
                            checked={settings.notifyAbsences}
                            onCheckedChange={(checked) =>
                              setSettings((prev) => ({ ...prev, notifyAbsences: !!checked }))
                            }
                          />
                          <Label htmlFor="notifyAbsences">Absences</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notifyGrades"
                            checked={settings.notifyGrades}
                            onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notifyGrades: !!checked }))}
                          />
                          <Label htmlFor="notifyGrades">Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notifyNews"
                            checked={settings.notifyNews}
                            onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notifyNews: !!checked }))}
                          />
                          <Label htmlFor="notifyNews">Actualités</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notifyEvents"
                            checked={settings.notifyEvents}
                            onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notifyEvents: !!checked }))}
                          />
                          <Label htmlFor="notifyEvents">Événements</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card id="security">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="passwordMinLength">Longueur minimale du mot de passe</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) => setSettings((prev) => ({ ...prev, passwordMinLength: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sessionTimeout">Timeout de session (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requirePasswordChange"
                        checked={settings.requirePasswordChange}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, requirePasswordChange: !!checked }))
                        }
                      />
                      <Label htmlFor="requirePasswordChange">
                        Forcer le changement de mot de passe à la première connexion
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enableTwoFactor"
                        checked={settings.enableTwoFactor}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enableTwoFactor: !!checked }))}
                      />
                      <Label htmlFor="enableTwoFactor">Activer l'authentification à deux facteurs</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Settings */}
              <Card id="system">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Système
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="timezone">Fuseau horaire</Label>
                      <Select
                        value={settings.timezone}
                        onValueChange={(value) => setSettings((prev) => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                          <SelectItem value="America/New_York">America/New_York</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Langue</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateFormat">Format de date</Label>
                      <Select
                        value={settings.dateFormat}
                        onValueChange={(value) => setSettings((prev) => ({ ...prev, dateFormat: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeFormat">Format d'heure</Label>
                      <Select
                        value={settings.timeFormat}
                        onValueChange={(value) => setSettings((prev) => ({ ...prev, timeFormat: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24h</SelectItem>
                          <SelectItem value="12h">12h</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backup Settings */}
              <Card id="backup">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Sauvegarde
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoBackup"
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoBackup: !!checked }))}
                    />
                    <Label htmlFor="autoBackup">Sauvegarde automatique</Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="backupFrequency">Fréquence</Label>
                      <Select
                        value={settings.backupFrequency}
                        onValueChange={(value) => setSettings((prev) => ({ ...prev, backupFrequency: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Quotidienne</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          <SelectItem value="monthly">Mensuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="backupRetention">Rétention (jours)</Label>
                      <Input
                        id="backupRetention"
                        type="number"
                        value={settings.backupRetention}
                        onChange={(e) => setSettings((prev) => ({ ...prev, backupRetention: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleReset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réinitialiser
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
