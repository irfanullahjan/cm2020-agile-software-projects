import "bootstrap/dist/css/bootstrap.min.css";
import "../common/styles/globals.css";

import type { AppProps } from "next/app";
import { Layout } from "../common/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const a = 2;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
