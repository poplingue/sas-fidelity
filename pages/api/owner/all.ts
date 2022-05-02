import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/owner/all
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.owner.findMany();
  res.json(result);
}
