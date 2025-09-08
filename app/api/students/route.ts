import { type NextRequest, NextResponse } from "next/server"
import { getStudentsByClassId, getStudentsByParentId } from "@/lib/database"
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
    const classId = searchParams.get("classId")

    if (user.role === "parent") {
      const students = await getStudentsByParentId(user.userId)
      return NextResponse.json(students)
    }

    if (classId) {
      const students = await getStudentsByClassId(classId)
      return NextResponse.json(students)
    }

    return NextResponse.json([])
  } catch (error) {
    console.error("Get students error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des élèves" }, { status: 500 })
  }
}
