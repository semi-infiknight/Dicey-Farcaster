"use client";

import localFont from "next/font/local";
import "./globals.css";
import FarcasterProvider from "@/providers/FarcasterProvider";
import Head from "next/head";

const myFont = localFont({
  src: "./ppneuebit-bold.otf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define the frame metadata
  const frameMetadata = {
    version: "next",
    imageUrl: "https://dicecast.sendarcade.fun/banner.png",
    button: {
      title: "🎮 Play",
      action: {
        type: "launch_frame",
        name: "Send Arcade",
        url: "https://dicecast.sendarcade.fun",
        splashImageUrl: "https://dicecast.sendarcade.fun/favicon.ico",
        splashBackgroundColor: "#1C71FF"
        
      }
    }
  };
  
  return (
    <html lang="en">
      <head>
        <title>Send Arcade</title>
        <meta name="description" content="Gamifying Blinks" />
        <meta property="og:title" content="Send Arcade" />
        <meta property="og:description" content="Gamifying Blinks" />
        <meta property="og:url" content="hhttps://dicecast.sendarcade.fun" />
        <meta property="og:site_name" content="Send Arcade" />
        <meta property="og:image" content="https://dicecast.sendarcade.fun/og.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Send Arcade" />
        <meta name="twitter:description" content="Gamifying Blinks" />
        <meta name="twitter:site" content="@send_arcade" />
        <meta name="twitter:image" content="https://dicecast.sendarcade.fun/og.jpg" />
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={myFont.className}>
        <FarcasterProvider>{children}</FarcasterProvider>
      </body>
    </html>
  );
}
