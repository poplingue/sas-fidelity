import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import OwnerHome from "../components/OwnerHome";
import ClientHome from "../components/ClientHome";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ExpectedQuery } from "./fidelity/sent";

export default function Home() {
  const [fidelityOwner, setFidelityOwner] = useState("");
  const [fidelityId, setFidelityId] = useState("");
  const [loyal, setLoyal] = useState(null);

  const { query }: NextRouter = useRouter();
  const { id }: ExpectedQuery = query;

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
      setFidelityId(id || localStorage.getItem("fidelity-id"));
    }

    if (id) {
      localStorage.setItem("fidelity-id", id);
    }

    if (!loyal) {
      getLoyal(id || fidelityId).then((resp) => {
        resp.json().then((data) => {
          setLoyal(data);
        });
      });
    }
  }, [fidelityId, id, loyal]);

  return (
    <Layout>
      <Link href="/secret">connection</Link>
      <br />
      <Link href="/fidelity">ajouter</Link>
      {fidelityOwner === "ok" ? <OwnerHome /> : null}
      {fidelityId ? <ClientHome id={id || loyal?.id} /> : null}
    </Layout>
  );
}
