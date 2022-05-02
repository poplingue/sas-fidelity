import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/loyal/all
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const result = await prisma.loyal.findMany();
    res.json(result);
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}
