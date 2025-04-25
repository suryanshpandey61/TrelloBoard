//fetch api
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });
  }

  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, Number(userId)));

    return new Response(JSON.stringify(userTasks), { status: 200 });
  } catch (error) {
    console.error("Fetch Tasks Error:", error);
    return new Response(JSON.stringify({ error: "DB Error" }), {
      status: 500,
    });
  }
}
