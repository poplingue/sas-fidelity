import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
    let promptEvent = null;

    const listenToUserAction = () => {
        const installBtn = document.querySelector('#button');
        installBtn.addEventListener('click', presentAddToHome);
    };

    const presentAddToHome = () => {
        promptEvent.prompt();  // Wait for the user to respond to the prompt
        promptEvent.userChoice
            .then(choice => {
                if (choice.outcome === 'accepted') {
                    console.log('User accepted');
                } else {
                    console.log('User dismissed');
                }
            })
    }

    useEffect(() => {
        if ('serviceWorker' in navigator) {

            window.addEventListener('fetch', () => console.log('fetch'));

            window.addEventListener('beforeinstallprompt', function (e) {
                console.log('==== beforeinstallprompt ==== ');

                e.preventDefault();
                promptEvent = e;
                listenToUserAction();
            });

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

    return <div>
        <Head>
            <title>SaS Fidelity</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel="manifest" href="manifest.json"/>
            <link rel="apple-touch-icon" href="img/192x192.png"/>
            <meta name="theme-color" content="#23e3b4"/>
        </Head>

        <h1>Hello world</h1>
        <button id="button">Installer</button>

    </div>;
}
