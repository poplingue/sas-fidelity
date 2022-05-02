import { useEffect } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";

export default function EmailSent() {
  let promptEvent = null;
  const email = localStorage.getItem("fidelity-email");

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
  return (
    <section>
      Bienvenue dans la communauté !
      <QRCode value={email} />
      <Link href="/">Accueil</Link>
    </section>
  );
}
