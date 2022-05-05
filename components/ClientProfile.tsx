import { Grid, Card, Text, Divider } from "@nextui-org/react";
import { niceFullDate } from "../helpers/utils";

export default function ClientProfile({ loyal }) {
  return (
    <Grid alignContent={"center"}>
      <Grid.Container gap={3} direction="column" alignItems={"center"}>
        <Card shadow css={{ background: "#7928ca" }}>
          <Card.Header>
            <Text css={{ color: "$white", px: "$6", py: "$4" }} size={24}>
              {loyal.email}
            </Text>
          </Card.Header>
          <Divider />
          <Card.Body css={{ py: "$12" }}>
            <Text css={{ color: "$white" }} size={20}>
              Passages en caisse : {loyal.cash}
            </Text>
            <Text css={{ color: "$white" }} size={20}>
              Cadeaux reçus : {loyal.present}
            </Text>
          </Card.Body>
          <Divider />
          <Card.Footer>
            <Text css={{ color: "$white" }}>
              Date de création : {niceFullDate(loyal.createdAt)}
            </Text>
          </Card.Footer>
        </Card>
      </Grid.Container>
    </Grid>
  );
}
