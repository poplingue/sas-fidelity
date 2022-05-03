import { useEffect } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface ExpectedQuery {
  email?: string;
  id?: string;
}

export default function EmailSent() {
  const { query }: NextRouter = useRouter();
  const { email }: ExpectedQuery = query;

  return (
    <section>
      Vous avez reçu un email Bienvenue dans la communauté
      <br />
      {email && (
        <>
          {email}
          <QRCode
            value={`${publicRuntimeConfig.baseUrl}/scan?email=${email}`}
          />
        </>
      )}
      <Link href="/">Accueil</Link>
    </section>
  );
}
