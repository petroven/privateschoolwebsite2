import { type NextRequest, NextResponse } from "next/server"
import { createNews, getNewsBySchoolId } from "@/lib/database"
import { cookies } from "next/headers"

async function getUserFromSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")

  if (!session) return null

  try {
    const sessionData = JSON.parse(atob(session.value))
    if (sessionData.exp < Date.now()) return null
    return sessionData
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const news = await getNewsBySchoolId(user.schoolId)
    return NextResponse.json(news)
  } catch (error) {
    console.error("Get news error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des actualités" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const newsData = await request.json()
    newsData.school_id = user.schoolId
    newsData.author_id = user.userId
    newsData.is_published = true

    const newNews = await createNews(newsData)

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    console.error("Create news error:", error)
    return NextResponse.json({ error: "Erreur lors de la création de l'actualité" }, { status: 500 })
  }
}
