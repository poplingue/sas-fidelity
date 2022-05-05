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
            size="1.6rem"
            css={{
              textGradient: "45deg, $blue500 -20%, $pink500 70%",
              pb: "$8"
            }}
          >
            Voici votre QR code personnel
          </Text>
          <Text as="p" size="1.2rem">
            Présentez-le à chaque passage en caisse
          </Text>
        </article>
      </Grid>
      {email && (
        <Grid alignContent={"center"} css={{ py: "$16" }}>
          <Grid.Container gap={3} direction="column" alignItems={"center"}>
            <Grid xs={12}>
              <QRCode
                size={220}
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
