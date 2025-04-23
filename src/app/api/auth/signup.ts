import {db} from "@/db/index"
import { usersTable } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method === "POST") {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const bcrypt = require('bcryptjs');

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into the database
      await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error. Cannot push the data." });
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
