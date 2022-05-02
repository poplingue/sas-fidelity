import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Fidelity() {
  const [email, setEmail] = useState("");
  const [fidelityEmail, setFidelityEmail] = useState("");
  const router = useRouter();

  const send = () => {
    localStorage.setItem("fidelity-email", email);
    router.push(`/fidelity/email-sent`);
  };

  useEffect(() => {
    if (localStorage && !fidelityEmail) {
      setFidelityEmail(localStorage.getItem("fidelity-email"));
    }
  }, []);

  const content = () => {
    const html = <div>{fidelityEmail}</div>;

    if (!fidelityEmail) {
      return (
        <>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={send}>devenir fidèle</button>
        </>
      );
    }
    return html;
  };
  return <section>{content()}</section>;
}
