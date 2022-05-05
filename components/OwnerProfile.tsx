import QRCode from "react-qr-code";
import { useState } from "react";
import { useRouter } from "next/router";
import { niceFullDate } from "../helpers/utils";
import getConfig from "next/config";
import { Grid, Card, Text, Divider, Button, Loading } from "@nextui-org/react";

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
    <Grid.Container justify={"center"}>
      <Grid>
        <Card shadow css={{ background: "#7928ca", py: "$2" }}>
          <Card.Header>
            <Text css={{ fontWeight: "$bold", color: "$white" }}>
              {profile.email}
            </Text>
          </Card.Header>
          <Divider />
          <Card.Body css={{ py: "$6" }}>
            <Text css={{ color: "$white" }}>
              Passages en caisse : {profile.cash}
            </Text>
            <Text css={{ color: "$white" }}>
              Cadeaux reçus : {profile.present}
            </Text>
          </Card.Body>
          <Divider />
          <Card.Footer>
            <Text css={{ color: "$white" }}>
              Date de création : {niceFullDate(profile.createdAt)}
            </Text>
          </Card.Footer>
        </Card>
      </Grid>
      <Grid css={{ p: "$6" }}>
        <QRCode
          size={160}
          value={`${publicRuntimeConfig.baseUrl}/scan?email=${profile.email}`}
        />
      </Grid>
      <Grid>
        <Button.Group size="sm" bordered>
          <Button onClick={() => cash("decrease")} rounded>
            - 1 passage
          </Button>
          <Button onClick={() => cash("increase")} rounded>
            + 1 passage
          </Button>
        </Button.Group>
      </Grid>
      <Grid css={{ py: "$4" }}>
        <Button
          onClick={confirmBeforeClick}
          color="secondary"
          size="sm"
          bordered
          rounded
        >
          supprimer
        </Button>
      </Grid>
    </Grid.Container>
  );
}
