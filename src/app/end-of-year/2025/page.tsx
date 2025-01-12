"use client"

import { FavoriteEmployees } from "@/app/end-of-year/2025/_components/FavoriteEmployees"
import Header from "@/app/end-of-year/_components/header"
import { Hero } from "@/app/end-of-year/_components/hero"
import { cn } from "@/lib/utils"
import { useStore } from "@/stores/root"
import { motion } from "framer-motion"
import Image from "next/image"

export default function EndOfYear2025Page() {
  const { state, setStore } = useStore()

  return (
    <section
      className={cn("relative h-screen overflow-hidden px-5 pb-20", {
        "flex items-center justify-center": state === "idle",
      })}
      onClick={() => {
        if (state !== "started") return
        setStore({
          state: "playing",
        })
      }}
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
    </section>
  )
}
