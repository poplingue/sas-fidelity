import { useEffect, useState } from "react";
import OwnerHome from "../components/OwnerHome";
import ClientHome from "../components/ClientHome";
import { NextRouter, useRouter } from "next/router";
import { ExpectedQuery } from "./fidelity/sent";
import { Button, Grid, Container, Text, Loading } from "@nextui-org/react";

export default function Home() {
  const [fidelityOwner, setFidelityOwner] = useState("");
  const [fidelityId, setFidelityId] = useState("");
  const [loyal, setLoyal] = useState(null);

  const { query }: NextRouter = useRouter();
  const { id }: ExpectedQuery = query;

  useEffect(() => {
    if (!fidelityOwner) {
      setFidelityOwner(localStorage.getItem("fidelity-owner"));
    }
  }, [fidelityOwner]);

  useEffect(() => {
    async function getLoyal(id) {
      return await fetch("/api/loyal/one", {
        method: "POST",
        body: JSON.stringify({ id: Number(id) })
      });
    }

    if (!fidelityId) {
      setFidelityId(id || localStorage.getItem("fidelity-id"));
    }

    if (id) {
      localStorage.setItem("fidelity-id", id);
    }

    if (!loyal) {
      getLoyal(id || fidelityId).then((resp) => {
        resp.json().then((data) => {
          setLoyal(data);
        });
      });
    }
  }, [fidelityId, id, loyal]);

  return (
    <>
      {!fidelityOwner && !fidelityId && (
        <Grid.Container justify="center">
          <Grid>
            <article>
              <Text
                as="p"
                size="1.6rem"
                css={{
                  textGradient: "60deg, $blue500 -20%, $pink500 100%",
                  pb: "$8"
                }}
              >
                {`Bienvenue dans l'application de fidélité du Salon à soi`}
              </Text>
              <Text as="p" size="1.2rem">
                {`Créer votre QR code personnel avec votre email et présentez-le à chaque passage en caisse. Au bout de 10 passages, une crêpe vous est offerte !`}
              </Text>
            </article>
          </Grid>
          <Grid css={{ py: "$16" }}>
            <Button as="a" href="/fidelity" color="gradient" size="xl" rounded>
              {`C'est parti`}
            </Button>
          </Grid>
        </Grid.Container>
      )}
      {fidelityOwner === "ok" ? <OwnerHome /> : null}
      {fidelityId ? <ClientHome id={id || loyal?.id} /> : null}
    </>
  );
}
