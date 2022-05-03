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
  if (req.method === "POST") {
    const loyal = await prisma.loyal.findUnique({
      where: { email: JSON.parse(req.body).email },
    });

    if (!loyal) {
      const result = await prisma.loyal.create({
        data: { email: JSON.parse(req.body).email },
      });

      console.log("==== without loyal sendEmail() ==== ", result);
      sendEmail(JSON.parse(req.body).email, result.id);

      res.json(result);
    } else {
      console.log("==== with loyal sendEmail() ==== ", loyal);
      sendEmail(JSON.parse(req.body).email, loyal.id);

      res.json({
        id: loyal.id,
        email: loyal.email,
        response: "ko",
        msg: "Email already exists, QR code sent",
      });
    }
  } else {
    res.json({ response: "ko", msg: "Bad request method" });
  }
}

function sendEmail(email, id) {
  const transporter = nodemailer.createTransport({
    port: 465,
    tls: {
      ciphers: "SSLv3",
    },
    host: "smtp.zoho.com",
    auth: {
      user: "paulinegc@zoho.com",
      pass: serverRuntimeConfig.emailPassword,
    },
    secure: true,
  });

  const mailData = {
    from: "paulinegc@zoho.com",
    to: email,
    subject: `Message From Un salon à soi`,
    text: `<div>ouech text</div>`,
    html: `<div><a href="${publicRuntimeConfig.baseUrl}?id=${id}">Lien</a></div>`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
      console.log("==== Nodemailer Err ==== ", err);
    } else {
      console.log("==== Nodemailer Info ==== ", info);
    }
  });
}
