import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import nodemailer from "nodemailer";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// POST /api/loyal/add
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.zoho.com",
    auth: {
      user: "paulinegc@zoho.com",
      pass: serverRuntimeConfig.emailPassword,
    },
    secure: true,
  });

  if (req.method === "POST") {
    const loyal = await prisma.loyal.findUnique({
      where: { email: JSON.parse(req.body).email },
    });

    if (!loyal) {
      const result = await prisma.loyal.create({
        data: { email: JSON.parse(req.body).email },
      });

      const mailData = {
        from: "paulinegc@zoho.com",
        to: JSON.parse(req.body).email,
        subject: `Message From Un salon à soi`,
        text: `<div>ouech text</div>`,
        html: `<div><a href="${publicRuntimeConfig.baseUrl}?id=${result.id}">Lien</a></div>`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      res.json(result);
    } else {
      res.json({ response: "ko", msg: "Email already exists" });
    }
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}
