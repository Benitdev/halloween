"use client"

import { SparklesCore } from "@/components/ui/sparktles"
import { Spotlight } from "@/components/ui/sportlight"
import { cn } from "@/lib/utils"
import { useStore } from "@/stores/root"
import { motion } from "framer-motion"

type Props = {
  headingContent: string
  isShowParticles?: boolean
}

export function Hero({ headingContent, isShowParticles = true }: Props) {
  const { state, setStore } = useStore()
  return (
    <motion.div
      layoutId="hero"
      className={cn("relative pt-[5rem]", {
        "pt-0": state !== "idle",
        "cursor-pointer": state === "idle",
      })}
      onClick={() =>
        setStore({
          state: "started",
        })
      }
      transition={{
        duration: 1,
      }}
    >
      <Spotlight
        className="left-0 top-40 md:-top-20 md:left-60"
        fill="#f55d5d"
      />
      <motion.h1
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className={cn(
          "animate-character mx-auto select-none space-x-1 text-center font-gesco text-xl font-extrabold uppercase !leading-[1.5] lg:text-3xl brightness-200 tracking-wider relative z-[999]",
          {
            "lg:text-[75px]": state === "idle",
          }
        )}
      >
        {headingContent.split("").map((char, index) => (
          <span
            key={index}
            style={{
              animationDelay: `calc(0.1s * ${index + 1})`,
            }}
          >
            {char}
          </span>
        ))}
      </motion.h1>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className={cn("relative h-36 w-full", {
          "h-2": !isShowParticles,
        })}
      >
        <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f55d5d] to-transparent blur-sm" />
        <div className="absolute left-1/2 top-0  h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f5885d] to-transparent" />
        <div className="absolute inset-x-[50%] top-0 h-[5px] w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffdc9c] to-transparent blur-sm" />
        <div className="absolute inset-x-[50%] top-0 h-px w-1/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ec3838] to-transparent" />
        {isShowParticles && (
          <>
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(400px_70px_at_top,transparent_50%,white)]"></div>
          </>
        )}
      </motion.div>
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
    </motion.div>
  )
}
