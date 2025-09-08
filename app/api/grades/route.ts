import { type NextRequest, NextResponse } from "next/server"
import { getGradesByStudentId } from "@/lib/database"
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

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")

    if (!studentId) {
      return NextResponse.json({ error: "ID élève requis" }, { status: 400 })
    }

    const grades = await getGradesByStudentId(studentId)
    return NextResponse.json(grades)
  } catch (error) {
    console.error("Get grades error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des notes" }, { status: 500 })
  }
}
