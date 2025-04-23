import { db } from "@/db/index"
import { usersTable } from "@/db/schema"
import jwt from "jsonwebtoken"
import { eq } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    const user = users[0]

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    const isMatch = password === user.password

    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 })
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    return new Response(JSON.stringify({ message: "Login successful", token }), {
      status: 200,
    })
  } catch (error: unknown) {
    console.error("Login error:", error)

    let message = "Internal Server Error"
    if (error instanceof Error) {
      message = error.message
    }

    return new Response(JSON.stringify({ error: "Internal Server Error", message }), {
      status: 500,
    })
  }
}
