import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Loading,
  Grid,
  Modal,
  useModal,
  Text
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
    if ((isIos() && !isInStandaloneMode()) || isFirefox() || !promptEvent) {
      handler();
    } else {
      promptEvent.prompt();

      promptEvent.userChoice.then((choice) => {
        console.log("==== userChoice ==== ", choice);

        if (choice.outcome === "accepted") {
          console.log("User accepted");
        } else {
          console.log("User dismissed");
        }
        promptEvent = null;
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

      window.addEventListener("fetch", () => console.log("fetch"));

      if (!promptEvent) {
        window.addEventListener("beforeinstallprompt", function (e) {
          e.preventDefault();
          promptEvent = e;

          const installBtn = document.querySelector("#button");

          if (installBtn) {
            installBtn.addEventListener("click", presentAddToHome);
          }
        });
      }
    }
  }, []);

  const icons = {
    ios: {
      label: () => `cliquer sur « ajouter à l'écran d'accueil »`,
      menu: () => <Image src="assets/ios-menu.svg" alt="menu ios" />,
      install: () => <Image src="assets/ios-install.svg" alt="install ios" />
    },
    firefox: {
      label: () => "installer",
      menu: () => <Image src="assets/more.svg" alt="more firefox" />,
      install: () => <Image src="assets/install.svg" alt="install firefox" />
    }
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
        <Button
          id="button"
          color="secondary"
          size="xl"
          bordered
          rounded
          onClick={presentAddToHome}
        >
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
                textGradient: "45deg, $blue500 -20%, $pink500 70%"
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
