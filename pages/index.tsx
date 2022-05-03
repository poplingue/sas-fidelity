import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import OwnerHome from "../components/OwnerHome";
import ClientHome from "../components/ClientHome";
import Link from "next/link";

export default function Home() {
  const [fidelityOwner, setFidelityOwner] = useState("");
  const [fidelityId, setFidelityEmail] = useState("");
  const [loyal, setLoyal] = useState(null);

  useEffect(() => {
    if (!fidelityOwner) {
      setFidelityOwner(localStorage.getItem("fidelity-owner"));
    }
  }, [fidelityOwner]);

  useEffect(() => {
    async function getLoyal(id) {
      return await fetch("/api/loyal/one", {
        method: "POST",
        body: JSON.stringify({ id: Number(id) }),
      });
    }

    if (!fidelityId) {
      setFidelityEmail(localStorage.getItem("fidelity-id"));
    }

    if (!loyal) {
      getLoyal(fidelityId).then((resp) => {
        resp.json().then((data) => {
          setLoyal(data);
        });
      });
    }
  }, [fidelityId, loyal]);

  return (
    <Layout>
      <Link href="/secret">connection</Link>
      <br />
      <Link href="/fidelity">ajouter</Link>
      {fidelityOwner === "ok" ? <OwnerHome /> : null}
      {fidelityId ? <ClientHome id={loyal?.id} /> : null}
    </Layout>
  );
}
