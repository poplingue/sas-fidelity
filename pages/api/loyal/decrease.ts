import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// PATCH /api/loyal/decrease
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const loyal = await prisma.loyal.findUnique({
      where: { email: req.body.email },
    });

    if (loyal && loyal.cash > 1) {
      const newLoyal = await prisma.loyal.update({
        where: { email: req.body.email },
        data: { cash: loyal.cash - 1 },
      });
      res.json({ ...newLoyal, response: "ok" });
    } else {
      res.json({ ...loyal, response: "ko" });
    }
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}
