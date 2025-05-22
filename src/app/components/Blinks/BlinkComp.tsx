"use client";

import { envHeliusRpcUrl } from "@/lib/envConfig";
import { Action, useAction } from "@dialectlabs/blinks";
import "@dialectlabs/blinks/index.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFarcasterSolanaProvider } from "@/providers/FarcasterProvider";
import { sdk } from "@farcaster/frame-sdk";
import { createFarcasterAdapter } from "@/lib/farcasterSolanaAdapter";

const DynamicBlink = dynamic(
  () => import("@dialectlabs/blinks").then((mod) => mod.Blink),
  { ssr: false }
);
import { Skeleton } from "@/components/ui/skeleton";

const BlinkComp = ({ propActionApiUrl }: { propActionApiUrl: string }) => {
  const [action, setAction] = useState<Action | null>(null);
  const [adapter, setAdapter] = useState<any>(null);
  const farcasterProvider = useFarcasterSolanaProvider();

  const actionApiUrl = propActionApiUrl;
  
  // Set up the adapter using the Farcaster provider
  useEffect(() => {
    const setupAdapter = async () => {
      try {
        if (farcasterProvider) {
          // Use our custom adapter that wraps the Farcaster provider
          const farcasterAdapter = await createFarcasterAdapter();
          setAdapter(farcasterAdapter);
          console.log("Created Farcaster adapter for Blink");
        } else {
          console.log("Farcaster provider not available yet");
        }
      } catch (error) {
        console.error("Failed to set up Farcaster adapter:", error);
      }
    };
    
    setupAdapter();
  }, [farcasterProvider]);

  // Always call useAction, but pass a dummy adapter if the real one isn't ready
  // This way we don't violate the Rules of Hooks
  const dummyAdapter = {}; // Empty adapter that will cause useAction to not do anything
  const { action: actionUrl } = useAction({
    url: actionApiUrl,
    adapter: adapter || dummyAdapter,
  });

  useEffect(() => {
    if (actionUrl && adapter) { // Only set action if we have both actionUrl and a real adapter
      setAction(actionUrl as Action);
    }
  }, [actionUrl, adapter]);

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
