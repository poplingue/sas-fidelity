import { useEffect, useState } from 'react';

export default function EmailSent() {
    let promptEvent = null;

    const listenToUserAction = () => {
        const installBtn = document.querySelector('#button');
        installBtn.addEventListener('click', presentAddToHome);
    };

    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };

    const isFirefox = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /firefox/.test(userAgent);
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {

            window.addEventListener('fetch', () => console.log('fetch'));

            if (isIos() && !isInStandaloneMode() || isFirefox()) {
                listenToUserAction();
            } else {

                window.addEventListener('beforeinstallprompt', function (e) {
                    e.preventDefault();
                    promptEvent = e;
                    listenToUserAction();
                });
            }

            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/service-worker.js').then(
                    function (registration) {
                        console.log(
                            'Service Worker registration successful with scope: ',
                            registration.scope
                        );


                    },
                    function (err) {
                        console.log(
                            'Service Worker registration failed: ',
                            err
                        );
                    }
                );
            });
        }
    }, []);
    return <section>
        Bienvenue dans la communauté !
        <button id="button">Installer</button>
    </section>;
}
