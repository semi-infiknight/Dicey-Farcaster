"use client";

import { envHeliusRpcUrl } from "@/lib/envConfig";
import { Action, useAction } from "@dialectlabs/blinks";
import "@dialectlabs/blinks/index.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sdk, type SolanaWalletProvider } from "@farcaster/frame-sdk";
import { useBlinkSolanaWalletAdapter } from "@/app/components/solana/useBlinkSolanaWalletAdapter";

const DynamicBlink = dynamic(
  () => import("@dialectlabs/blinks").then((mod) => mod.Blink),
  { ssr: false }
);
import { Skeleton } from "@/components/ui/skeleton";

const BlinkComp = ({ propActionApiUrl }: { propActionApiUrl: string }) => {
  const [action, setAction] = useState<Action | null>(null);
  const [wallet, setWallet] = useState<SolanaWalletProvider | null>(null);
  const { adapter: blinkAdapter } = useBlinkSolanaWalletAdapter(envHeliusRpcUrl, wallet);

  const actionApiUrl = propActionApiUrl;

  // Set up the adapter using the Farcaster provider
  useEffect(() => {
    const setupAdapter = async () => {
      try {
        const provider = await sdk.experimental.getSolanaProvider()
        if (provider) {
          setWallet(provider as SolanaWalletProvider);
        }
      } catch (error) {
        console.error("Failed to set up Farcaster adapter:", error);
      }
    };

    setupAdapter();
  }, []);


  const { action: actionUrl } = useAction({
    url: actionApiUrl,
    adapter: blinkAdapter as any,
  });

  useEffect(() => {
    if (actionUrl && blinkAdapter) { // Only set action if we have both actionUrl and a real adapter
      setAction(actionUrl as Action);
    }
  }, [actionUrl, blinkAdapter]);

  return (
    <>
      {action ? (
        <DynamicBlink
          stylePreset="default"
          action={action}
          websiteText={new URL(actionApiUrl).hostname}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[320px]" />
          <Skeleton className="h-[16px]" />
          <Skeleton className="h-[16px]" />
          <Skeleton className="h-[32px]" />
          <div className="flex gap-2">
            <Skeleton className="h-[32px]" />
            <Skeleton className="h-[32px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default BlinkComp;
