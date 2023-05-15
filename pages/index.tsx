import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Preahvihear, Space_Grotesk } from "next/font/google";
import classNames from "classnames";
import BackgroundGradient from "../components/background-gradient";
import Card from "../components/card";
import { MouseEvent, useCallback, useRef, useState } from "react";
import client from "../config-client"; // import the CSS file here
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const HomeContent: NextPage = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [receiving, setReceiving] = useState(false);
  const resultRef = useRef(null);

  const start = useCallback(async () => {
    setResult("");
    setReceiving(true);

    const response = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input ? input : client.exampleInput,
      }),
    });

    if (!response.ok) {
      setReceiving(false);
      return;
    }

    const data = await response.text();

    if (!data) {
      return;
    }

    setResult(data);

    setReceiving(false);
  }, [input]);

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <>
      <Head>
        <title>BassBuddy</title>
      </Head>
      <main>
        <h1>BassBuddy</h1>
        <label htmlFor="input">Input:</label>
        <input id="input" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={start}>Start</button>
        <p>{result}</p>
        <button onClick={copyToClipboard}>Copy to clipboard</button>
      </main>
    </>
  );
};

const Home: NextPage = () => (
    <ProtectedRoute component={HomeContent} />
);
  

export default (Home);
