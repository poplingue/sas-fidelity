import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Fidelity() {
  const [email, setEmail] = useState("");
  const [fidelityEmail, setFidelityEmail] = useState("");
  const [fidelityOwner, setFidelityOwner] = useState("");
  const router = useRouter();

  const send = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/loyal/add", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    debugger; // eslint-disable-line
    if (!fidelityOwner) {
      localStorage.setItem("fidelity-id", data.id);
    }
    const url = fidelityOwner ? "/loyal" : `/fidelity/sent?email=${data.email}`;

    router.push(url);
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("fidelity-id")) {
      localStorage.removeItem("fidelity-id");
    }
  }, []);

  useEffect(() => {
    if (localStorage && !fidelityOwner) {
      setFidelityOwner(localStorage.getItem("fidelity-owner"));
    }
  }, [fidelityOwner]);

  const content = () => {
    return (
      <form onSubmit={send}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="submit"
          value={
            fidelityOwner === "ok" ? "ajouter un·e fidèle" : "devenir fidèle"
          }
        />
      </form>
    );
  };
  return <section>{content()}</section>;
}
