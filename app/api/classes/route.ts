import { type NextRequest, NextResponse } from "next/server"
import { createClass, getClassesBySchoolId } from "@/lib/database"
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

    const classes = await getClassesBySchoolId(user.schoolId)
    return NextResponse.json(classes)
  } catch (error) {
    console.error("Get classes error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des classes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user || (user.role !== "admin" && user.role !== "teacher")) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const classData = await request.json()
    classData.school_id = user.schoolId

    const newClass = await createClass(classData)

    return NextResponse.json(newClass, { status: 201 })
  } catch (error) {
    console.error("Create class error:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la classe" }, { status: 500 })
  }
}
