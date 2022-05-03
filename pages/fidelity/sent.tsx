import { useEffect } from "react";
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
  let promptEvent = null;

  const { query }: NextRouter = useRouter();
  const { email }: ExpectedQuery = query;

  const listenToUserAction = () => {
    const installBtn = document.querySelector("#button");
    installBtn.addEventListener("click", presentAddToHome);
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
    const dialog = document.getElementById("dialog");

    const cancelButton = document.getElementById("cancel");
    cancelButton.addEventListener("click", function () {
      dialog["close"]();
    });

    if ((isIos() && !isInStandaloneMode()) || isFirefox()) {
      dialog["showModal"]();
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
    if ("serviceWorker" in navigator) {
      window.addEventListener("fetch", () => console.log("fetch"));

      if ((isIos() && !isInStandaloneMode()) || isFirefox()) {
        listenToUserAction();
      } else {
        window.addEventListener("beforeinstallprompt", function (e) {
          e.preventDefault();
          // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return (
    <section>
      Vous avez reçu un email Bienvenue dans la communauté
      <br />
      {email && (
        <>
          {email}
          <QRCode
            value={`${publicRuntimeConfig.baseUrl}/scan?email=${email}`}
          />
        </>
      )}
      <Link href="/">Accueil</Link>
    </section>
  );
}
