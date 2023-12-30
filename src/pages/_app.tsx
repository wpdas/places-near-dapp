import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

import type { AppProps } from "next/app";
import Providers from "./providers";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Places DApp - NEAR</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}
