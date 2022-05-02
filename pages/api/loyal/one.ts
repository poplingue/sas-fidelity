import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/loyal/one
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = await prisma.loyal.findUnique({
      where: { email: req.body.email },
    });
    if (result) {
      res.json({ ...result, response: "ok" });
    } else {
      res.json({ response: "ko" });
    }
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}
