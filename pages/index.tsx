import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from '../components/layout'
export default function Home() {
  let promptEvent = null;
  const [init, setInit] = useState(true);
  const [fidelityEmail, setFidelityEmail] = useState("");

  const listenToUserAction = () => {
    const installBtn = document.querySelector("#button");
    installBtn.addEventListener("click", presentAddToHome);
  };

  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isFirefox = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /firefox/.test(userAgent);
  };

  const presentAddToHome = () => {
    const dialog = document.getElementById("dialog");

    const cancelButton = document.getElementById("cancel");
    cancelButton.addEventListener("click", function () {
      dialog.close();
    });

    if ((isIos() && !isInStandaloneMode()) || isFirefox()) {
      dialog.showModal();
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
      setFidelityEmail(localStorage.getItem("fidelity-email"));
    }
  }, []);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, []);

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
      label: () => `ajouter à l'écran d'accueil`,
      menu: () => <img src="assets/ios-menu.svg" />,
      install: () => <img src="assets/ios-install.svg" />,
    },
    firefox: {
      label: () => "installer",
      menu: () => <img src="assets/more.svg" />,
      install: () => <img src="assets/install.svg" />,
    },
  };

  return (
      <Layout>


      <h1>Hello world</h1>

      <Link href="/qrcode">Mon QR code</Link>
      <Link href={`/profile?email=${fidelityEmail}`}>
        Mes points de fidélité
      </Link>
      <button id="button">Installer</button>
      {!init && (
        <dialog id="dialog">
          <div id="cancel">fermer</div>
          <br />
          Pour installer l'application sur votre mobile,
          <br />
          parcourez le menu de votre navigateur{" "}
          {icons[isFirefox() ? "firefox" : "ios"].menu()} <br />
          puis « {icons[isFirefox() ? "firefox" : "ios"].label()} »{" "}
          {icons[isFirefox() ? "firefox" : "ios"].install()}
        </dialog>
      )}
      </Layout>
  );
}
