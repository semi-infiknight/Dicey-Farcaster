import { useState } from 'react';
import BottomBG from "@/assets/svgs/bgs/BottomBG.svg";
import TopBG from "@/assets/svgs/bgs/TopBG.svg";
import Image from "next/image";
import { games } from "../data/games";
import { tweets } from "../data/tweets";
import BlinkComp from "./Blinks/BlinkComp";
import { Tweet } from 'react-twitter-widgets';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import closeIcon from "@/assets/svgs/buttons/close.svg";
import { CardBg } from "@/assets/bgs/CardBg";

const TweetWithSkeleton = ({ tweetId }: { tweetId: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className="w-full h-[400px]" />
      )}
      <Tweet
        tweetId={tweetId}
        onLoad={() => setIsLoading(false)}
        options={{ conversation: 'none' }} // Optional: Customize tweet appearance
      />
    </div>
  );
};

const LeftBackgroundSVG = () => {
  return (
    <div className="flex flex-col justify-between items-start w-[240px] h-[500px] sm:w-[300px] sm:h-[600px] md:w-[360px] md:h-[700px] lg:w-[420px] lg:h-[800px] xl:w-[469px] xl:h-[965px]">
      <div className="w-full">
        <img src="/left_top.png" alt="left top" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

const BlinksSection = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const fullCA = "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa";
    navigator.clipboard.writeText(fullCA);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div
      id="blinks"
      className="min-h-screen relative flex flex-col items-center bg-[#1C71FF] overflow-hidden"
    >
      {/* Left Background SVG */}
      <div className="absolute left-0 top-0 h-full pointer-events-none">
        <LeftBackgroundSVG />
      </div>

      <div className="relative z-10 w-full">
        <header className="absolute top-0 left-0 w-full flex justify-end p-2 sm:p-6 z-20">
          {/* Chain selector removed */}
        </header>

        <p className="text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px] xl:text-[94px] text-center pt-24 leading-none">
          Games on Sonic SVM
        </p>

        <div className={`grid ${games.length === 1 ? 'grid-cols-1 md:pl-56 md:pr-56 lg:pl-72 lg:pr-72 xl:pl-96 xl:pr-96 2xl:pl-144 2xl:pr-144' : games.length === 2 ? 'grid-cols-1 md:grid-cols-2 xl:pl-40 xl:pr-40 2xl:pl-72 2xl:pr-72 gap-4 xl:gap-16' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:pl-20 xl:pr-20 gap-4 xl:gap-12'} w-full max-w-7.5xl p-4 justify-center xl:pt-8 relative z-10 mx-auto`}>
          {games.map((game, index) => (
            <div key={index}>
              <p className="text-[42px] leading-none text-center mb-8 mt-4">{game.title}</p>
              <BlinkComp propActionApiUrl={game.blinkUrl} />

              {/* Game Mechanics Text */}
              <div className="hidden md:block">
                <Dialog>  
                  <DialogTrigger>
                    <p
                      className="text-[36px] text-center mt-4 cursor-pointer hover:underline"
                    >
                      Game Mechanics ➪
                    </p>
                  </DialogTrigger>

                  <DialogContent className="bg-[#1C71FF] max-h-[800px] overflow-y-auto">
                    <div className="flex flex-col text-white">
                      <div className="flex justify-between align-top">
                        <div className="text-[42px]">{game.title}</div>
                        <DialogClose>
                          <Image
                            className="w-8 h-8"
                            src={closeIcon}
                            alt="close"
                            width={40}
                            height={40}
                          />
                        </DialogClose>
                      </div>
                      <div className="text-[24px] whitespace-pre-line pb-4 leading-none">{game.description}</div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-10 mt-8 mb-8">
          <div className="inline-block cursor-pointer">
            <a
              href="https://x.com/send_arcade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18px] sm:text-[24px] lg:text-[42px] bg-[#1D41B9] text-white border-[4px] sm:border-[6px] lg:border-[12px] border-[#699EFF] px-2 sm:px-4 lg:px-6 py-2 sm:py-4"
            >
              Twitter/X
            </a>
          </div>
          <div className="inline-block cursor-pointer">
            <a
              href="https://t.me/+NYGSumBT885mMThk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18px] sm:text-[24px] lg:text-[42px] bg-white text-[#1C71FF] border-[4px] sm:border-[6px] lg:border-[12px] border-[#699EFF] px-2 sm:px-4 lg:px-6 py-2 sm:py-4"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="flex justify-center mb-8 mt-4">
          <button
            onClick={handleCopy}
            className="text-[16px] sm:text-[20px] lg:text-[24px] bg-white/10 text-white border border-white/30 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 cursor-pointer hover:bg-white/20 hover:border-white/50 hover:-translate-y-1 transition-all duration-200 rounded-lg backdrop-blur-sm flex items-center gap-2"
          >
            <span>SENDdR...EvpCxa</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-all duration-200 ${isCopied ? 'text-green-400' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isCopied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <Image
        className="w-full h-full"
        src={BottomBG}
        alt="Sponsors"
        width={240}
        height={240}
      />
    </div>
  );
};

export default BlinksSection;
