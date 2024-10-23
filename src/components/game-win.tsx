import Image from "next/image"
import { motion } from "framer-motion"
import { useStore } from "@/stores/root"
import { shuffleArray } from "@/app/utils"

export const GameWin = () => {
  const { cards, setStore } = useStore()

  return (
    <motion.div className="fixed z-[29] w-screen h-screen overflow-hidden grid place-items-center bg-black/70 backdrop-blur-sm top-0">
      <motion.div
        initial={{
          rotate: 100,
        }}
        animate={{
          x: [1500, 1500, -700, 0],
          rotate: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.5,
          type: "spring",
        }}
        className="flex flex-col items-center gap-16"
      >
        <Image src={"/images/win.svg"} alt="" width={300} height={20} />
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
          className="flex items-center justify-center w-[250px] h-[94px]"
          style={{
            backgroundImage: "url(/images/button-bg.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() =>
            setStore({
              state: "playing",
              sorting: true,
              cards: shuffleArray(
                cards.map((card) => ({
                  ...card,
                  opened: false,
                }))
              ),
            })
          }
        >
          <span className="font-eater text-2xl tracking-[4px] font-bold">
            Who next?
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
