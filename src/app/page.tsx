'use client'

import { useEffect } from "react"
import HeroSection from "./components/HeroSection"
import BlinksSection from "./components/BlinksSection"
import { sdk } from "@farcaster/frame-sdk"

export default function Home() {
  useEffect(() => {
    // Initialize Farcaster SDK
    const init = async () => {
      try {
        // Hide splash screen when ready
        await sdk.actions.ready()
        
        // If you want to pre-connect the wallet when the page loads
        const provider = await sdk.experimental.getSolanaProvider()
        if (provider) {
          try {
            await (provider as any).connect?.()
            console.log("Connected to Farcaster Solana provider")
          } catch (error) {
            console.error("Failed to connect to Farcaster Solana provider:", error)
          }
        }
      } catch (error) {
        console.error("Failed to initialize Farcaster:", error)
      }
    }
    
    init()
  }, [])
  
  return (
    <main className="bg-white h-full min-h-screen">
      {/* <HeroSection /> */}
      <BlinksSection />
    </main>
  )
}
