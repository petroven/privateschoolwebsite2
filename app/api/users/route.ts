import { type NextRequest, NextResponse } from "next/server"
import { createUser, getUsersByRole } from "@/lib/database"
import { cookies } from "next/headers"

// Helper function to get user from session
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
    const role = searchParams.get("role")

    if (role) {
      const users = await getUsersByRole(user.schoolId, role)
      return NextResponse.json(users)
    }

    // Return all users for admin
    if (user.role === "admin") {
      const users = await getUsersByRole(user.schoolId, "")
      return NextResponse.json(users)
    }

    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const userData = await request.json()

    // Add school_id from session
    userData.school_id = user.schoolId
    userData.is_active = true

    const newUser = await createUser(userData)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Erreur lors de la création de l'utilisateur" }, { status: 500 })
  }
}
