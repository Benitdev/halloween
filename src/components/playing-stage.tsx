import { useStore } from "@/stores/root"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Timer } from "@/components/timer"
import { GameOver } from "@/components/game-over"
import { GameWin } from "@/components/game-win"

export const PlayingStage = () => {
  const [selectedCard, setSelectedCard] = useState<{
    id: number
    img: string
  } | null>(null)
  const { state, cards, triggerCard, setStore } = useStore()
  const [missedAudioTrigger, setMissedAudioTrigger] = useState(0)
  const [matchedAudioTrigger, setMatchedAudioTrigger] = useState(0)

  const handleOnCardClick = (id: number, img: string) => {
    if (state === "playing") setStore({ state: "started" })

    triggerCard(id)

    if (!selectedCard) {
      setSelectedCard({ id, img })
      return
    }

    if (selectedCard.img !== img) {
      setMissedAudioTrigger((prev) => ++prev)
      setTimeout(() => {
        triggerCard(selectedCard.id)
        triggerCard(id)
      }, 500)
    } else setMatchedAudioTrigger((prev) => ++prev)

    setSelectedCard(null)
  }

  useEffect(() => {
    if (cards.every((card) => card.opened)) setStore({ state: "win" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  return (
    <div className="grid gap-4 grid-cols-6 place-items-center px-4 w-fit mx-auto max-w-6xl">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          layoutId={card.id.toString()}
          className="flip-card h-[23vh] w-[17.5vh] shadow-xl"
          onClick={() => {
            if (card.opened || (state !== "started" && state !== "playing"))
              return
            handleOnCardClick(card.id, card.imageUrl)
          }}
          initial={{
            opacity: 0,
            x: 1000,
            y: 1000,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: index * 0.15,
          }}
        >
          <div className={`flip-card-inner ${card.opened ? "opened" : ""}`}>
            <div
              className="flip-card-front rounded-md grid place-items-center select-none"
              style={{
                backgroundImage: "url(/images/option-1.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Image
                className="-translate-y-4"
                src={"/images/logo.png"}
                alt=""
                width={100}
                height={50}
              />
            </div>
            <div className="flip-card-back bg-[#fff]/40 backdrop-blur-sm rounded-md border-orange-500 border-[3px]">
              <Image
                className="h-full"
                src={card.imageUrl}
                alt=""
                width={200}
                height={200}
              />
            </div>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{
          x: 100,
          y: -100,
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 2,
          type: "spring",
        }}
        className="fixed top-[.7rem] right-[2rem]"
      >
        <Image src={"/images/logo.png"} alt="" width={250} height={70} />
      </motion.div>

      <Timer />
      {/* Missed Audio  */}
      <audio
        key={"missed" + missedAudioTrigger}
        autoPlay={!!missedAudioTrigger}
      >
        <source src={`/audios/game-missed.mp3`} type="audio/mpeg"></source>
      </audio>
      {/* Matched Audio  */}
      <audio
        key={"matched" + matchedAudioTrigger}
        autoPlay={!!matchedAudioTrigger}
      >
        <source src={`/audios/game-matched.mp3`} type="audio/mpeg"></source>
      </audio>
      {/* Game over  */}
      {state === "gameOver" && <GameOver />}
      {state === "win" && <GameWin />}
    </div>
  )
}
