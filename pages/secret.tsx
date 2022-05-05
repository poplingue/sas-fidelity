import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Grid, Input } from "@nextui-org/react";

export default function Secret() {
  const [secret, setSecret] = useState("");
  const router = useRouter();

  const send = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/owner/check", {
      method: "POST",
      body: JSON.stringify({ secret })
    });

    const data = await res.json();
    localStorage.setItem("fidelity-owner", data.response);

    router.push("/");
  };

  return (
    <form onSubmit={send}>
      <Grid.Container>
        <Grid css={{ py: "$8" }}>
          <Input.Password
            bordered
            size="xl"
            type="password"
            label="Code secret"
            onChange={(e) => setSecret(e.target.value)}
          />
        </Grid>
        <Grid>
          <Button type="submit" href="/loyal/qrcode" color="gradient" size="xl">
            Accéder
          </Button>
        </Grid>
      </Grid.Container>
    </form>
  );
}
