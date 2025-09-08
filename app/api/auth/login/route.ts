import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
    }

    // Get user from database
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 })
    }

    // In a real app, you would verify the password hash here
    // For demo purposes, we'll accept any password for existing users

    // Create session token (in production, use proper JWT)
    const sessionToken = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.school_id,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    )

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        schoolId: user.school_id,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Erreur de connexion" }, { status: 500 })
  }
}
