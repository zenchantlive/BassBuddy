import "../styles/globals.css";
import type { AppProps } from "next/app";
/* global.css */
import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

.font-space-grotesk {
  font-family: 'Space Grotesk', sans-serif;
}


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
