import QRCode from "react-qr-code";
import { useState } from "react";
import { useRouter } from "next/router";
import { niceFullDate } from "../helpers/utils";
import Link from "next/link";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default function OwnerProfile({ loyal, scan }) {
  const router = useRouter();
  const [profile, setProfile] = useState(loyal);

  const cash = async (action: String) => {
    const res = await fetch(`/api/loyal/${action}`, {
      method: "PATCH",
      body: JSON.stringify({ email: loyal.email }),
    });

    const data = await res.json();
    setProfile(data);
  };

  const deleteLoyal = async () => {
    const res = await fetch(`/api/loyal/delete`, {
      method: "DELETE",
      body: JSON.stringify({ email: loyal.email }),
    });

    const data = await res.json();

    if (data.response === "ok") {
      router.push("/loyal");
    }
  };

  const confirmBeforeClick = () => {
    if (confirm(`❗ Supprimer ${loyal.email} ?`)) {
      deleteLoyal();
    }
  };

  return (
    <section>
      <h2>Owner profile</h2>
      <p>scan: {scan}</p>
      <div>Email : {profile.email}</div>
      <div>Passages en caisse : {profile.cash}</div>
      <div>Date de création : {niceFullDate(profile.createdAt)}</div>
      <div>Cadeaux reçus : {profile.present}</div>
      <QRCode
        value={`${publicRuntimeConfig.baseUrl}/scan?email=${profile.email}`}
      />
      <hr />
      <button onClick={() => cash("increase")}>+</button>
      <button onClick={() => cash("decrease")}>-</button>
      <hr />
      <button onClick={confirmBeforeClick}>Supprimer</button>
      <hr />
      <Link href="/">accueil</Link>
    </section>
  );
}
