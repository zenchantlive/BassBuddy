import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Preahvihear, Space_Grotesk } from "next/font/google";
import classNames from "classnames";
import BackgroundGradient from "../components/background-gradient";
import Card from "../components/card";
import { MouseEvent, useCallback, useRef, useState, useEffect } from "react";
import client from "../config-client";
import { saveAs } from 'file-saver';

// Define custom font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// Create MessageBubble Component
const MessageBubble: React.FC<{message: string, isUser: boolean}> = ({message, isUser}) => {
  return (
    <div style={{
      maxWidth: "80%",
      backgroundColor: isUser ? "lightgreen" : "lightblue",
      borderRadius: "20px",
      margin: "10px",
      padding: "10px",
      alignSelf: isUser ? "flex-end" : "flex-start"
    }}>
      <p>{message}</p>
    </div>
  )
}
// Home Component
const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [receiving, setReceiving] = useState(false);
  const [messages, setMessages] = useState<Array<{sender: string, text: string}>>([]);

  const downloadTxtFile = () => {
    const file = new Blob([messages.join('\n')], { type: 'text/plain' });
    saveAs(file, 'results.txt');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(messages.join('\n'));
  };

  useEffect(() => {
    if (result) {
      setMessages((prev) => [...prev, {sender: 'assistant', text: result}]);
    }
  }, [result]);

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
    setResult(data);
    setReceiving(false);
  }, [input]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleButtonClick = () => {
    start();
    setMessages((prev) => [...prev, {sender: 'user', text: input}]);
  };


  return (
    <div className="relative flex min-h-screen overflow-hidden isolate flex-col items-center justify-start py-2 bg-gray-100 text-black dark:bg-neutral-900 dark:text-gray-100">
      <Head>
        <title>{client.appName}</title>
        <link rel="icon" href={client.appLogo} />
      </Head>
      <BackgroundGradient className="top-0 left-0 h-96 w-48 bg-indigo-500/30 duration-500 dark:bg-blue-500/40" />
      <BackgroundGradient className="left-60 top-96 h-64 w-72 rounded-lg bg-blue-500/30  duration-700 dark:bg-indigo-500/40" />
      <BackgroundGradient className="right-96 bottom-60 h-60 w-60 rounded-lg bg-red-500/30 dark:bg-violet-500/30" />
      <BackgroundGradient className="right-0 bottom-0 h-48 w-96 rounded-full bg-orange-500/30 dark:bg-cyan-500/30" />

      <main className="flex w-full flex-1 flex-col items-center p-5 text-center">
        {client.appLogo ? (
          <img className="w-20 mt-20 h-20 rounded-2xl" src={client.appLogo} />
        ) : undefined}
        <h1
          className={classNames(
            "text-3xl sm:text-6xl font-bold",
            client.appLogo ? "mt-10" : "mt-48"
          )}
        >
          <span
            className="text-blue-600"
            style={{
              color: client.appThemeColor            }}
          >
            {client.appName}
          </span>
        </h1>

        <p className="mt-3 max-w-lg opacity-70">{client.appSummary}</p>
{messages.length > 0 &&
  messages.map((message, index) => (
    <Card
      key={index}
      className="overflow-hidden break-words text-start w-full max-w-lg bg-blue-100/20"
      style={{
        minHeight: "9rem",
      }}
    >
      <pre className="p-4 whitespace-pre-wrap">{message.text}</pre>
    </Card>
  ))}
        
        <button
          className={classNames(
            spaceGrotesk.className,
            "text-white rounded-xl px-5 py-2 m-5 text-xl font-bold hover:opacity-70 transition-all duration-300 disabled:opacity-50"
          )}
          style={{ background: client.appThemeColor }}
          disabled={receiving}
          onClick={handleButtonClick}
        >
          Start
        </button>
        {result !== undefined ? (
          <Card
            className="overflow-hidden break-words text-start w-full max-w-lg bg-blue-100/20"
            style={{
              minHeight: "9rem",
            }}
          >
            <pre className="p-4 whitespace-pre-wrap">{result}</pre>
          </Card>
        ) : undefined}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} isUser={index % 2 === 0} />
        ))}

        <button
          className={classNames(
            spaceGrotesk.className,
            "fixed bottom-0 right-0 mb-5 mr-5 text-white rounded-xl px-5 py-2 text-xl font-bold hover:opacity-70 transition-all duration-300"
          )}
          style={{ background: client.appThemeColor }}
          onClick={() => window.open('https://www.buymeacoffee.com/zenchant', '_blank')}
        >
          Buy me a 🥑?
        </button>

        <button onClick={downloadTxtFile}>Download Results</button>
        <button onClick={copyToClipboard}>Copy Results</button>

      </main>

      <footer className="flex h-24 w-full items-center justify-center">
        <p className="text-center">© 2023 by Zenchants. Proudly created with Next.js and OpenAI</p>
      </footer>
    </div>
  );
};

export default Home;
