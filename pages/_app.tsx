import "../styles/global.css";
import type { AppProps } from "next/app";
import ComponentType from "next/app";
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps & { Component: ComponentType }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;


