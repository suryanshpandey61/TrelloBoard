// app/api/auth/signup/route.ts
import { db } from "@/db/index";
import { usersTable } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();
    // const bcrypt = require('bcryptjs');

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ error: "Passwords do not match" }), {
        status: 400,
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({
      name,
      email,
      password,
    });

    return new Response(JSON.stringify({ message: "User Created Successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Signup API Error",error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
