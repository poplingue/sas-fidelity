import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

// POST /api/loyal/one
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = await prisma.loyal.findUnique({
      where: { id: JSON.parse(req.body).id },
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
