"use client"

import { PlayingStage } from "@/components/playing-stage"
import StartingStage from "@/components/starting-stage"
import { useStore } from "@/stores/root"
import Image from "next/image"
import { motion } from "framer-motion"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Audio } from "@/components/audio"
import { useEffect, useRef } from "react"
import { shuffleArray } from "@/app/utils"
import { cn } from "@/lib/utils"

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { state, cards, setStore } = useStore()

  useEffect(() => {
    if (state !== "transform-to-playing") return

    const timer = setTimeout(() => {
      ;(
        document.getElementById("sorting-card-audio") as HTMLAudioElement
      )?.play()
      setStore({
        state: "playing",
        cards: shuffleArray(
          cards.map((card) => ({
            ...card,
            opened: false,
          }))
        ),
      })
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [state])

  return (
    <BackgroundBeamsWithCollision>
      <motion.div
        className="absolute inset-0"
        animate={{
          scale:
            state === "transform-to-playing" || state === "playing"
              ? 30
              : [2, 1],
          transformOrigin:
            state === "transform-to-playing" || state === "playing"
              ? "16% 22% 0"
              : undefined,
          opacity: state === "playing" ? 0 : 1,
        }}
        transition={{
          duration: 5,
          type: "spring",
          scale: {
            duration: 4,
            type: "spring",
            delay: 1,
          },
        }}
      >
        <Image
          src={"/images/castle-bg.svg"}
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>
      {state !== "idle" && state !== "transform-to-playing" && (
        <motion.div
          className="absolute inset-0"
          style={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            opacity: {
              delay: 0.75,
              duration: 2,
            },
            scale: {
              duration: 1,
            },
          }}
        >
          <Image src={"/images/bg.png"} alt="" fill className="object-cover" />
        </motion.div>
      )}
      <motion.div
        style={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 4,
        }}
        className={cn("absolute inset-0 bg-black/40", {
          "bg-black/80": state !== "idle" && state !== "transform-to-playing",
        })}
      ></motion.div>
      <main className="relative h-screen flex flex-col overflow-hidden items-center w-full">
        {(state === "idle" || state === "transform-to-playing") && (
          <motion.div
            className="fixed top-[11%]"
            initial={{
              y: -300,
            }}
            animate={{
              y: state === "idle" ? 0 : 1000,
              rotate: [45, 90, 180, 360],
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: state === "transform-to-playing" ? 0.9 : 3,
              rotate: {
                type: "spring",
                duration: 1,
                delay: 4,
              },
            }}
          >
            <Image src={"/images/logo-2.svg"} alt="" width={250} height={100} />
          </motion.div>
        )}
        <motion.div
          className="mt-4"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: state === "transform-to-playing" ? 0 : 1,
            scale:
              state === "idle" ? 2 : state === "transform-to-playing" ? 0 : 1,
            y: state === "idle" ? 230 : -10,
            rotate: [-7, 7, -7, 7, -7],
            transformOrigin:
              state === "transform-to-playing" ? "50% 275% 0" : undefined,
          }}
          transition={{
            duration: 1,
            rotate: {
              repeat: Infinity,
              type: "tween",
              duration: 3,
            },
            delay: state === "transform-to-playing" ? 0 : 2,
          }}
        >
          <Image
            src={"/images/game-logo.svg"}
            alt=""
            width={350}
            height={100}
          />
        </motion.div>

        {state === "idle" && <StartingStage />}
        {state !== "idle" && state !== "transform-to-playing" && (
          <PlayingStage />
        )}
      </main>
      <audio id="sorting-card-audio" ref={audioRef}>
        <source src={`/audios/game-matched.mp3`} type="audio/mpeg"></source>
      </audio>
      <Audio />
      <audio id="play-click-audio" ref={audioRef}>
        <source
          src={`/audios/game-clicked-play.mp3`}
          type="audio/mpeg"
        ></source>
      </audio>
      <Audio />
    </BackgroundBeamsWithCollision>
  )
}
