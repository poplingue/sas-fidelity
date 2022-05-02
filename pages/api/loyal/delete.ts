import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// DELETE /api/loyal/delete
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const result = await prisma.loyal.delete({
      where: { email: JSON.parse(req.body).email },
    });
    if (result) {
      res.json({ response: "ok" });
    } else {
      res.json({ response: "ko" });
    }
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}
