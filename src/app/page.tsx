"use client"

import { PlayingStage } from "@/components/playing-stage"
import StartingStage from "@/components/starting-stage"
import { useStore } from "@/stores/root"
import Image from "next/image"
import { motion } from "framer-motion"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Audio } from "@/components/audio"
import { useRef } from "react"

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { state } = useStore()

  return (
    <BackgroundBeamsWithCollision>
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
        className="absolute inset-0 bg-black/80"
      ></motion.div>
      <main className="relative h-screen flex flex-col overflow-hidden items-center w-full">
        <motion.div
          className="mt-4"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: state === "idle" ? 2 : 1,
            y: state === "idle" ? 200 : -10,
            rotate: [-7, 7, -7, 7, -7],
          }}
          transition={{
            duration: 1,
            rotate: {
              repeat: Infinity,
              type: "tween",
              duration: 3,
            },
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
        {state !== "idle" && <PlayingStage />}
      </main>
      <audio id="play-click-audio" ref={audioRef}>
        <source src={`/audios/game-matched.mp3`} type="audio/mpeg"></source>
      </audio>
      <Audio />
    </BackgroundBeamsWithCollision>
  )
}
