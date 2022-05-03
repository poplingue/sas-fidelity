import QRCode from "react-qr-code";
import {useEffect, useState} from "react";
import Link from "next/link";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default function Code() {
  const [loyal, setLoyal] = useState(null);

  useEffect(() => {
    async function getData() {
      const id = localStorage.getItem("fidelity-id");

      const res = await fetch(`/api/loyal/one`, {
        method: "POST",
        body: JSON.stringify({ id: Number(id) }),
      });

      return await res.json();
    }

    if (!loyal) {
      getData().then((data) => {
        setLoyal(data);
      });
    }
  }, [loyal]);

  return (
    <section>
      {loyal && (
        <>
          {loyal.email}
          <QRCode
            value={`${publicRuntimeConfig.baseUrl}/scan?email=${loyal.email}`}
          />
        </>
      )}
          <br/>
      <Link href="/">Accueil</Link>
      <br />
    </section>
  );
}
