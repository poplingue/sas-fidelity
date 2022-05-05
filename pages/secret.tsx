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
      body: JSON.stringify({ secret }),
    });

    const data = await res.json();
    localStorage.setItem("fidelity-owner", data.response);

    router.push("/");
  };

  return (
    <Grid>
      <Grid.Container gap={2}>
        <form onSubmit={send}>
          <Grid>
            <Input.Password
              css={{ w: "100%" }}
              bordered
              size="lg"
              type="password"
              label="Code secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              href="/loyal/qrcode"
              color="gradient"
              size="xl"
              rounded
            >
              Accéder
            </Button>
          </Grid>
        </form>
      </Grid.Container>
    </Grid>
  );
}
