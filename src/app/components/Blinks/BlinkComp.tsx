"use client";

import { envHeliusRpcUrl } from "@/lib/envConfig";
import { Action, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import "@dialectlabs/blinks/index.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFarcasterSolanaProvider } from "@/providers/FarcasterProvider";
import { sdk } from "@farcaster/frame-sdk";

const DynamicBlink = dynamic(
  () => import("@dialectlabs/blinks").then((mod) => mod.Blink),
  { ssr: false }
);
import { Skeleton } from "@/components/ui/skeleton";

const BlinkComp = ({ propActionApiUrl }: { propActionApiUrl: string }) => {
  const [action, setAction] = useState<Action | null>(null);
  const farcasterProvider = useFarcasterSolanaProvider();

  const actionApiUrl = propActionApiUrl;
  
  // Use the adapter from useActionSolanaWalletAdapter for now, but we can use the farcasterProvider
  // to enhance it with Farcaster capabilities
  const { adapter } = useActionSolanaWalletAdapter(envHeliusRpcUrl as string);
  
  // If we have the Farcaster provider, create a new enhanced adapter
  useEffect(() => {
    if (farcasterProvider) {
      const enhanceAdapter = async () => {
        try {
          // Connect the farcaster provider if it's available
          await (farcasterProvider as any).connect?.();
          console.log("Connected Farcaster provider for Blink");
        } catch (error) {
          console.error("Failed to connect Farcaster provider for Blink:", error);
        }
      };
      
      enhanceAdapter();
    }
  }, [farcasterProvider]);

  // useAction initiates registry, adapter and fetches the action.
  const { action: actionUrl } = useAction({
    url: actionApiUrl,
    adapter,
  });

  useEffect(() => {
    if (actionUrl) {
      setAction(actionUrl as Action);
    }
  }, [actionUrl]);

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
