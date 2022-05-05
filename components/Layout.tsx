import { Grid, Container, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [fidelityOwner, setFidelityOwner] = useState("");
  const [fidelityId, setFidelityId] = useState("");
  const { pathname } = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("fidelity-id");
    const owner = localStorage.getItem("fidelity-owner");

    if (!fidelityId) {
      setFidelityId(id);
    }

    if (!fidelityOwner) {
      setFidelityOwner(owner);
    }
  }, [fidelityId, fidelityOwner]);

  return (
    <Container
      display="grid"
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <main>
        <Grid.Container justify="center" gap={4}>
          <Grid
            style={{
              position: "absolute",
              top: 0
            }}
          >
            <Button.Group size="lg" color="gradient" bordered>
              {pathname === "/" && !fidelityOwner ? (
                <Button as="a" href="/fidelity">
                  QR code
                </Button>
              ) : (
                <Button as="a" href="/" size="xs" color="gradient" bordered>
                  Accueil
                </Button>
              )}
              <Button as="a" href="/secret">
                Espace pro
              </Button>
            </Button.Group>
          </Grid>
        </Grid.Container>
        {children}
      </main>
    </Container>
  );
}
