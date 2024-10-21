import { shuffleArray } from "@/app/utils"
import { useStore } from "@/stores/root"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const StartingStage = () => {
  const { cards, setStore } = useStore()

  return (
    <div className="flex-1 w-full grid place-items-center">
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: [1, 1.2, 0.8, 1.2, 1],
        }}
        transition={{
          delay: 1,
          scale: {
            repeat: Infinity,
            duration: 1,
          },
        }}
        className="flex items-center justify-center w-[300px] h-[114px] select-none"
        style={{
          backgroundImage: "url(/images/button-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => {
          ;(
            document.getElementById("play-click-audio") as HTMLAudioElement
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
        }}
      >
        <span className="font-eater text-2xl tracking-[4px] font-bold">
          PLAY GAME
        </span>
      </motion.div>
      <motion.div
        layoutId="logo-img"
        initial={{
          y: 200,
        }}
        animate={{
          x: "-50%",
          y: 0,
        }}
        transition={{
          duration: 2,
          type: "spring",
        }}
        className="fixed bottom-[.7rem] left-1/2"
      >
        <Image src={"/images/logo.png"} alt="" width={250} height={70} />
      </motion.div>
    </div>
  )
}

export default StartingStage
