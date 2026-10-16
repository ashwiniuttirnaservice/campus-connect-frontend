import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/app/layout";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
