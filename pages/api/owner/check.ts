import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";

// POST /api/owner/check
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const result = await prisma.owner.findFirst({
        where: {secret: JSON.parse(req.body).secret},
    });

    if (result) {
        res.json({...result, response: "ok"});
    } else {
        res.json({response: "ko"});
    }
}
