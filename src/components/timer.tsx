import { useStore } from "@/stores/root"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const TIME_OUT = 45

export const Timer = () => {
  const { state, setStore } = useStore()
  const [seconds, setSeconds] = useState(TIME_OUT)

  useEffect(() => {
    if (state === "started") {
      const timer = setInterval(() => setSeconds((prev) => --prev), 1000)
      return () => clearInterval(timer)
    }
    if (state === "playing") setSeconds(TIME_OUT)
  }, [state])

  useEffect(() => {
    if (seconds) return
    setStore({ state: "gameOver" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  return (
    <motion.div
      initial={{
        x: -100,
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
      className="fixed top-[1.25rem] left-[2rem] flex items-center gap-3 w-[160px] h-[65px] justify-center pt-2 font-mono"
      style={{
        backgroundImage: "url(/images/time-bg.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        animate={{
          scale: seconds < 15 && seconds !== 0 ? [1.2, 0.8, 1.1] : [1],
        }}
        transition={{
          repeat: Infinity,
        }}
      >
        <Image
          src={"/images/halloween-clock-icon.svg"}
          alt=""
          width={35}
          height={35}
        />
      </motion.div>
      <div className="text-4xl font-bold">
        {Math.floor(seconds / 60)}
        <span>:</span>
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
    </motion.div>
  )
}
