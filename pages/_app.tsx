import type { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { Toaster } from "../components/ui/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </ThirdwebProvider>
  );
}

export default MyApp;
