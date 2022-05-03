import { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { ExpectedQuery } from "./fidelity/sent";

export default function Scan() {
  const [fidelityOwner, setFidelityOwner] = useState("");
  const { query }: NextRouter = useRouter();
  const { email }: ExpectedQuery = query;
  const router = useRouter();

  useEffect(() => {
    if (localStorage && !fidelityOwner) {
      setFidelityOwner(localStorage.getItem("fidelity-owner"));
    }
  }, [fidelityOwner]);

  useEffect(() => {
    async function cash() {
      const res = await fetch(`/api/loyal/increase`, {
        method: "PATCH",
        body: JSON.stringify({ email }),
      });

      return await res.json();
    }

    if (fidelityOwner && email) {
      cash().then((data) => {
        if (data.response === "ok") {
          router.push(`/loyal/${data.id}?scan=success`);
        } else {
          router.push(`/loyal/${data.id}?scan=error`);
        }
      });
    }
  }, [email, fidelityOwner, router]);

  return <></>;
}
