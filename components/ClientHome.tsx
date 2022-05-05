import { useEffect, useState } from "react";
import {
  Button,
  Loading,
  Grid,
  Modal,
  useModal,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/router";

export default function ClientHome({ id }) {
  let promptEvent = null;
  const { setVisible, bindings } = useModal();
  const [init, setInit] = useState(true);
  const [fidelityEmail, setFidelityEmail] = useState("");
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const handler = () => setVisible(true);

  const listenToUserAction = () => {
    const installBtn = document.querySelector("#button");

    if (installBtn) {
      installBtn.addEventListener("click", presentAddToHome);
    }
  };

  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator["standalone"];

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isFirefox = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /firefox/.test(userAgent);
  };

  const presentAddToHome = () => {
    if ((isIos() && !isInStandaloneMode()) || isFirefox()) {
      handler();
    } else {
      promptEvent.prompt(); // Wait for the user to respond to the prompt
      promptEvent.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted");
        } else {
          console.log("User dismissed");
        }
      });
    }
  };

  useEffect(() => {
    if (!fidelityEmail) {
      setFidelityEmail(localStorage.getItem("fidelity-id"));
    }
  }, [fidelityEmail]);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("fetch", () => console.log("fetch"));

      if ((isIos() && !isInStandaloneMode()) || isFirefox()) {
        listenToUserAction();
      } else {
        window.addEventListener("beforeinstallprompt", function (e) {
          e.preventDefault();
          promptEvent = e;
          listenToUserAction();
        });
      }

      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  const icons = {
    ios: {
      label: () => `cliquer sur « ajouter à l'écran d'accueil »`,
      menu: () => <img src="assets/ios-menu.svg" />,
      install: () => <img src="assets/ios-install.svg" />,
    },
    firefox: {
      label: () => "installer",
      menu: () => <img src="assets/more.svg" />,
      install: () => <img src="assets/install.svg" />,
    },
  };

  const goTo = (url: string) => {
    setLoad(true);

    router.push(url).then(() => {
      setLoad(false);
    });
  };

  return (
    <Grid.Container gap={2} justify={"center"}>
      <Grid>
        <Button
          onClick={() => goTo("/loyal/qrcode")}
          color="gradient"
          size="xl"
          rounded
        >
          {load ? <Loading color="white" type="points" /> : "Mon QR code"}
        </Button>
      </Grid>
      <Grid>
        <Button
          color="gradient"
          onClick={() => goTo(`/loyal/${id}`)}
          size="xl"
          rounded
        >
          {load ? <Loading color="white" type="points" /> : "Mon profil"}
        </Button>
      </Grid>
      <Grid>
        <Button id="button" color="secondary" size="xl" bordered rounded>
          {`Installer l'application`}
        </Button>
      </Grid>
      {!init && (
        <Modal
          scroll
          width="600px"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <Modal.Header>
            <Text
              css={{
                textGradient: "45deg, $blue500 -20%, $pink500 70%",
              }}
              size={26}
            >{`Installer l'application`}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text as="p" size={22}>
              Parcourez le menu de votre navigateur{" "}
              <Text as="p" size={22}>
                puis {icons[isFirefox() ? "firefox" : "ios"].label()}
              </Text>
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              bordered
              color="secondary"
              onClick={() => setVisible(false)}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Grid.Container>
  );
}
