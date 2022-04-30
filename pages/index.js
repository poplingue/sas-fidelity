import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {

    useEffect(() => {
        if ('serviceWorker' in navigator) {

            window.addEventListener('fetch', () => console.log('fetch'));

            window.addEventListener('beforeinstallprompt', function () {
                console.log('==== beforeinstallprompt ==== ');
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
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="manifest" href="manifest.json"/>
            <meta name="theme-color" content="#23e3b4"/>
        </Head>

        <h1>Hello world</h1>

    </div>;
}
