import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/loyal/add
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = await prisma.loyal.create({
      data: { email: req.body.email },
    });

    res.json(result);
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}
