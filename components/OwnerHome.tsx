import { Grid, Button, Loading } from "@nextui-org/react";

export default function OwnerHome() {
  return (
    <Grid.Container gap={2} justify={"center"}>
      <Grid>
        <Button as="a" href="/loyal" color="gradient" size="xl" rounded>
          Les fidèles
        </Button>
      </Grid>
    </Grid.Container>
  );
}
