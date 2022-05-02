import Head from "next/head";

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>SaS Fidelity</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="manifest" href="manifest.json"/>
                <link rel="apple-touch-icon" href="img/192x192.png"/>
                <meta name="theme-color" content="#23e3b4"/>
            </Head>
            <main>{children}</main>
            <footer>
                
            </footer>
        </>
    )
}
