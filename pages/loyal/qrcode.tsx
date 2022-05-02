import QRCode from "react-qr-code";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Code() {
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (!email) {
            setEmail(localStorage.getItem("fidelity-email"))
        }
    }, [])

  return (
    <section>
      {email}
      <QRCode value={email} />
      <Link href="/">Accueil</Link><br/>
    </section>
  );
}
