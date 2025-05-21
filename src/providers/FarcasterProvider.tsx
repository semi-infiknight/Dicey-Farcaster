"use client";

import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

// Create a context to share the Solana provider
export const FarcasterContext = createContext<any>(null);

export function useFarcasterSolanaProvider() {
  return useContext(FarcasterContext);
}

export default function FarcasterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [solanaProvider, setSolanaProvider] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initFarcaster = async () => {
      try {
        // Initialize SDK and hide splash screen
        await sdk.actions.ready();
        
        // Get Solana provider from Farcaster
        const provider = await sdk.experimental.getSolanaProvider();
        setSolanaProvider(provider);
        setIsInitialized(true);
        
        console.log("Farcaster Solana provider initialized");
      } catch (error) {
        console.error("Failed to initialize Farcaster:", error);
      }
    };

    initFarcaster();
  }, []);

  return (
    <FarcasterContext.Provider value={solanaProvider}>
      {children}
    </FarcasterContext.Provider>
  );
} 