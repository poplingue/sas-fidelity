import { useEffect, useState } from "react";
import OwnerProfile from "../../components/OwnerProfile";
import ClientProfile from "../../components/ClientProfile";
import { useRouter } from "next/router";

export default function Profile() {
  const [fidelityOwner, setFidelityOwner] = useState("");
  const [loyal, setLoyal] = useState(null);

  const {
    query: { id, scan },
  } = useRouter();

  useEffect(() => {
    if (localStorage && !fidelityOwner) {
      setFidelityOwner(localStorage.getItem("fidelity-owner"));
    }
  }, [fidelityOwner]);

  useEffect(() => {}, []);

  useEffect(() => {
    async function getData() {
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
  }, [id, loyal]);

  return (
    <>
      {fidelityOwner === "ok" ? (
        <>{loyal && <OwnerProfile scan={scan} loyal={loyal} />}</>
      ) : (
        <>{loyal && <ClientProfile loyal={loyal} />}</>
      )}
    </>
  );
}
