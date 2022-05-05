import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import { Grid, Text } from "@nextui-org/react";

const { publicRuntimeConfig } = getConfig();

export default function Code() {
  const [loyal, setLoyal] = useState(null);

  useEffect(() => {
    async function getData() {
      const id = localStorage.getItem("fidelity-id");

      const res = await fetch(`/api/loyal/one`, {
        method: "POST",
        body: JSON.stringify({ id: Number(id) }),
      });

      return await res.json();
    }

    if (!loyal) {
      getData().then((data) => {
        setLoyal(data);
      });
    }
  }, [loyal]);

  return (
    <>
      {loyal && (
        <Grid alignContent={"center"}>
          <Grid.Container gap={3} direction="column" alignItems={"center"}>
            <Grid xs={12}>
              <QRCode
                size={240}
                value={`${publicRuntimeConfig.baseUrl}/scan?email=${loyal.email}`}
              />
            </Grid>
            <Grid xs={12}>
              <Text as="p" size="1rem">
                {loyal.email}
              </Text>
            </Grid>
          </Grid.Container>
        </Grid>
      )}
    </>
  );
}
