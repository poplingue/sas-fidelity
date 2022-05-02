import QRCode from "react-qr-code";

export default function Code() {
  const email = localStorage.getItem("fidelity-email");

  return (
    <section>
      {email}
      <QRCode value={email} />
    </section>
  );
}
