import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { SchoolProvider } from "@/components/school-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700", "900"], // Added black weight for headings
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "EduConnect - Plateforme Éducative",
  description: "Plateforme de gestion scolaire pour écoles privées",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>
              <SchoolProvider>{children}</SchoolProvider>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
