import { type NextRequest, NextResponse } from "next/server"
import { createMessage, getMessagesByUserId, markMessageAsRead } from "@/lib/database"
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

    const messages = await getMessagesByUserId(user.userId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const messageData = await request.json()
    messageData.sender_id = user.userId
    messageData.is_read = false

    const newMessage = await createMessage(messageData)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error("Create message error:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { messageId } = await request.json()
    const updatedMessage = await markMessageAsRead(messageId)

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error("Mark message as read error:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour du message" }, { status: 500 })
  }
}
