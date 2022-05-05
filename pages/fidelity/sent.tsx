import { Button, Grid, Text } from "@nextui-org/react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export interface ExpectedQuery {
  email?: string;
  id?: string;
}

export default function EmailSent() {
  const { query }: NextRouter = useRouter();
  const { email }: ExpectedQuery = query;

  return (
    <Grid.Container justify="center">
      <Grid>
        <article>
          <Text
            as="p"
            size="1.5rem"
            css={{
              textGradient: "45deg, $blue500 -20%, $pink500 70%",
            }}
          >
            Voici votre QR code personnel. Présentez-le à chaque passage en
            caisse.
          </Text>
        </article>
      </Grid>
      {email && (
        <Grid alignContent={"center"}>
          <Grid.Container gap={3} direction="column" alignItems={"center"}>
            <Grid xs={12}>
              <QRCode
                size={200}
                value={`${publicRuntimeConfig.baseUrl}/scan?email=${email}`}
              />
            </Grid>
            <Grid xs={12}>
              <Text as="p" size="1rem">
                {email}
              </Text>
            </Grid>
          </Grid.Container>
        </Grid>
      )}
    </Grid.Container>
  );
}
