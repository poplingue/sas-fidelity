import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";

// PATCH /api/loyal/increase
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PATCH") {
        const loyal = await prisma.loyal.findUnique({
            where: {email: req.body.email},
        });

        if (loyal) {
            const newLoyal = await prisma.loyal.update({
                where: {email: req.body.email},
                data: {
                    cash: loyal.cash === 9 ? 1 : loyal.cash + 1,
                    present: loyal.cash === 9 ? loyal.present + 1 : loyal.present,
                },
            });
            res.json({...newLoyal, response: "ok"});
        } else {
            res.json({response: "ko"});
        }
    } else {
        res.json({response: "ko", msg: "Bad request method"});
    }
}
