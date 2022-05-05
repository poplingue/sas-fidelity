import { NextUIProvider, Grid } from "@nextui-org/react";
import Layout from "../components/Layout";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SaS Fidelity</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="img/192x192.png" />
        <meta name="theme-color" content="#23e3b4" />
      </Head>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </>
  );
}
