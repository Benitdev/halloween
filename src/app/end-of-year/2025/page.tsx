"use client"

import { FavoriteEmployees } from "@/app/end-of-year/2025/_components/FavoriteEmployees"
import Header from "@/app/end-of-year/_components/header"
import { Hero } from "@/app/end-of-year/_components/hero"
import { cn } from "@/lib/utils"
import { useStore } from "@/stores/root"
import { motion } from "framer-motion"
import Image from "next/image"

export default function EndOfYear2025Page() {
  const { state } = useStore()

  return (
    <section
      className={cn("relative h-screen overflow-hidden px-5 pb-20", {
        "flex items-center justify-center": state === "idle",
      })}
    >
      {state !== "idle" && <Header />}
      <div className="grid place-items-center">
        {state === "idle" && (
          <>
            <motion.div
              layoutId="header-logo"
              initial={{
                y: -30,
                x: -50,
                opacity: 0,
              }}
              exit={{
                x: 1000,
              }}
              animate={{
                y: 0,
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="w-[120px] md:w-[240px]"
            >
              <Image
                src={"/custom-logo-company-white.png"}
                alt=""
                width={240}
                height={60}
              />
            </motion.div>
            <motion.div
              layoutId="header-slogan"
              initial={{
                y: -30,
                x: 50,
                opacity: 0,
              }}
              exit={{
                x: -1000,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="heading-animation relative z-20 select-none text-center text-base font-bold uppercase text-white md:text-2xl lg:text-6xl font-hongKy2"
            >
              <h2 className="tracking-widest">Year End Party 2024</h2>
              <h2 className="absolute inset-0 tracking-widest">
                Year End Party 2024
              </h2>
            </motion.div>
          </>
        )}
        <Hero headingContent="FAVORITE EMPLOYEE OF THE YEAR" />
      </div>

      {state !== "idle" && <FavoriteEmployees />}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-yellow-600/40 bg-gradient-to-tr blur-[200px]"></div>
      <div className="pointer-events-none absolute -left-[20%] top-[15%] h-32 w-[70rem] -rotate-45 bg-pink-600/60 bg-gradient-to-tr blur-[200px]"></div>
      <div className="pointer-events-none absolute -right-[30%] bottom-[15%] h-[10rem] w-[70rem] rotate-45 bg-red-600/60 bg-gradient-to-tr blur-[130px]"></div>
      <div className="fixed bottom-0 left-0 right-0 h-[30vh] opacity-35">
        <Image
          src={"/images/end-of-year-2025/building.png"}
          alt="building"
          fill
          className="object-cover"
        />
      </div>
      <motion.div
        initial={{
          scale: 3,
          opacity: 0.5,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="fixed bottom-0 left-0 right-0 h-[30vh] brightness-125"
      >
        <Image
          src={"/images/end-of-year-2025/building.png"}
          alt="building"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{
          x: -500,
          y: -500,
        }}
        animate={{
          x: 0,
          y: state === "idle" ? -70 : 0,
        }}
        transition={{
          duration: 1,
        }}
        className="fixed top-0 left-0 h-[calc(20vw/1.1)] w-[20vw]"
      >
        <Image
          src={"/images/end-of-year-2025/hihi-05.png"}
          alt="hoa mai"
          sizes="33vw"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{
          y: -1000,
        }}
        animate={{
          y: state === "idle" ? 70 : 140,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed top-0 left-0 h-[calc(7vw*4)] w-[7vw]"
      >
        <Image
          src={"/images/end-of-year-2025/hihi-08.png"}
          alt="hoa mai"
          sizes="100vw"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{
          x: 500,
          scaleX: -1,
          y: -500,
        }}
        animate={{
          x: -70,
          scaleX: -1,
          y: state === "idle" ? 0 : 70,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed top-0 right-0 h-[calc(20vw/1.1)] w-[20vw]"
      >
        <Image
          src={"/images/end-of-year-2025/hihi-04.png"}
          alt="hoa dao"
          sizes="100vw"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{
          y: -1000,
        }}
        animate={{
          y: state === "idle" ? 100 : 170,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
        className="fixed top-0 right-0 h-[calc(7vw*4)] w-[7vw]"
      >
        <Image
          src={"/images/end-of-year-2025/hihi-07.png"}
          alt="hoa mai"
          sizes="100vw"
          fill
          className="object-cover"
        />
      </motion.div>
    </section>
  )
}
