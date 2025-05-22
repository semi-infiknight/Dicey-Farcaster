"use client";

import { sdk } from "@farcaster/frame-sdk";
import { PublicKey } from "@solana/web3.js";

// Use a more generic approach to avoid TypeScript errors
export async function createFarcasterAdapter() {
  try {
    const provider = await sdk.experimental.getSolanaProvider();
    
    if (!provider) {
      throw new Error("Farcaster Solana provider not available");
    }
    
    // Create an adapter that uses the Farcaster provider
    // Create a mutable adapter object
    const adapter = {
      // We'll have to set publicKey later after connecting
      publicKey: null as PublicKey | null,
      
      // Pass transactions through to the provider
      signTransaction: async (transaction: any) => {
        // Use the provider as is, without strict typing
        return await (provider as any).signTransaction(transaction);
      },
      
      // For multiple transactions, we'll use as-is
      signAllTransactions: async (transactions: any[]) => {
        if ((provider as any).signAllTransactions) {
          return await (provider as any).signAllTransactions(transactions);
        }
        // Fallback: sign each transaction individually
        return Promise.all(transactions.map(tx => (provider as any).signTransaction(tx)));
      },
      
      // Sign messages
      signMessage: async (message: any) => {
        return await (provider as any).signMessage(message);
      },
      
      // Connect method
      connect: async () => {
        const result = await (provider as any).connect();
        // Set publicKey after connecting
        if (result && result.publicKey) {
          adapter.publicKey = new PublicKey(result.publicKey);
        }
        return result;
      },
      
      // Disconnect is not supported
      disconnect: async () => {
        console.log("Disconnect not supported in Farcaster");
      }
    };
    
    return adapter;
  } catch (error) {
    console.error("Failed to create Farcaster adapter:", error);
    throw error;
  }
} 