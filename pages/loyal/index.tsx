import Link from "next/link";
import { useEffect, useState } from "react";

export default function All() {
  const [loyals, setLoyals] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/loyal/all`, {
        method: "GET",
      });

      return await res.json();
    }

    if (!loyals.length) {
      getData().then((data) => {
        setLoyals(data);
      });
    }
  }, [loyals.length]);

  return (
    <section>
      {loyals.map((loyal) => {
        return (
          <div key={loyal.email}>
            <Link href={`/loyal/${loyal.id}`}>{loyal.email}</Link>
          </div>
        );
      })}
      <hr />
      <Link href="/">Accueil</Link>
      <br />
    </section>
  );
}
