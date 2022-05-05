import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Text, Input } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";

type Status = "default" | "error" | "success";

export default function Fidelity() {
  const [email, setEmail] = useState("");
  const [fidelityOwner, setFidelityOwner] = useState("");
  const router = useRouter();

  const send = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/loyal/add", {
      method: "POST",
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!fidelityOwner) {
      localStorage.setItem("fidelity-id", data.id);
    }
    const url = fidelityOwner ? "/loyal" : `/fidelity/sent?email=${data.email}`;

    router.push(url);
  };

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
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

  function statusEmailInput(): Status {
    let s: Status = "default";

    if (!email || email.length < 3) {
      return s;
    }

    if (validateEmail(email)) {
      s = "success";
    } else {
      s = "error";
    }

    return s;
  }

  return (
    <>
      <Grid>
        <article>
          <Text
            as="p"
            size="1.6rem"
            css={{
              textGradient: "45deg, $blue500 -20%, $pink500 70%"
            }}
          >
            Ici, pas de spam ou de revente de données, juste un mail pour être
            dans notre liste de fidèles
          </Text>
        </article>
      </Grid>
      <Grid>
        <form onSubmit={send}>
          <Grid.Container>
            <Grid css={{ py: "$8" }}>
              <Input
                bordered
                status={statusEmailInput()}
                size="xl"
                type="email"
                label="Email"
                clearable
                placeholder="gigi@boumboum.fr"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid>
              <Button
                type="submit"
                href="/loyal/qrcode"
                color="gradient"
                size="xl"
              >
                {fidelityOwner === "ok" ? "Ajouter un·e fidèle" : "Valider"}
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Grid>
    </>
  );
}
