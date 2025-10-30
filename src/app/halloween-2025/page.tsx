"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Spotlight } from "@/components/ui/sportlight"
import CongratulationParticles from "@/components/ui/CongratulationParticles"

type Spider = {
  id: number
  x: number // percentage viewport width (0-100)
  y: number // percentage viewport height (0-100)
  size?: number // px
  rotate?: number // deg
  wobbleOffset?: number // seconds offset
}

const GAME_DURATION_SECONDS = 5 * 60 // 5 minutes
const TARGET_SPIDERS = 200
const MAX_CONCURRENT_SPIDERS = 10
const SPAWN_INTERVAL_MS = 500
const DESPAWN_MIN_MS = 3000
const DESPAWN_MAX_MS = 6000

export default function Halloween2025Page() {
  const [started, setStarted] = useState(false)
  const [remaining, setRemaining] = useState(GAME_DURATION_SECONDS)
  const [spiders, setSpiders] = useState<Spider[]>([])
  const [foundCount, setFoundCount] = useState(0)
  const [ended, setEnded] = useState(false)
  const [won, setWon] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>(
    []
  )
  const lastClickTime = useRef(0)
  const clickCount = useRef(0)
  const suspectedCheatromes = useRef(0)
  const [alreadyPlayed, setAlreadyPlayed] = useState(false)

  // Mark as played when game ends
  useEffect(() => {
    if (!ended) return
    if (alreadyPlayed) return
    localStorage.setItem("halloween2025_played", "true")
  }, [ended, alreadyPlayed])

  // Check if game has been played before
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("halloween2025_played") === "true") {
        setAlreadyPlayed(true)
      }
    }
  }, [])

  // Spawn logic
  useEffect(() => {
    if (!started || ended) return
    const interval = setInterval(() => {
      const id = Date.now() + Math.floor(Math.random() * 1000)
      const x = 5 + Math.random() * 90
      const y = 10 + Math.random() * 80
      const size = 18 + Math.round(Math.random() * 16) // smaller for difficulty
      const rotate = -15 + Math.random() * 30
      const wobbleOffset = Math.random() * 1.2

      setSpiders((prev) => {
        if (prev.length >= MAX_CONCURRENT_SPIDERS) return prev
        return [...prev, { id, x, y, size, rotate, wobbleOffset }]
      })

      const ttl =
        DESPAWN_MIN_MS + Math.random() * (DESPAWN_MAX_MS - DESPAWN_MIN_MS)
      setTimeout(() => {
        setSpiders((prev) => prev.filter((s) => s.id !== id))
      }, ttl)
    }, SPAWN_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [started, ended])

  // Timer
  useEffect(() => {
    if (!started || ended) return
    const t = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(t)
          setEnded(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [started, ended])

  const handleStart = () => {
    setStarted(true)
    setEnded(false)
    setWon(false)
    setFoundCount(0)
    setRemaining(GAME_DURATION_SECONDS)
    setSpiders([])
    setBursts([])
    lastClickTime.current = 0
    clickCount.current = 0
    suspectedCheatromes.current = 0
    try {
      document
        .getElementById("play-click-audio")
        ?.dispatchEvent(new Event("play"))
    } catch {}
  }

  const handleCollect = (id: number) => {
    const target = spiders.find((s) => s.id === id)
    if (!target) return

    // Anti-cheat: timestamp check
    const now = Date.now()
    const timeSinceLastClick = now - lastClickTime.current
    lastClickTime.current = now

    // Anti-cheat: debounce rapid clicks (< 50ms is suspicious)
    if (timeSinceLastClick < 50) {
      suspectedCheatromes.current++
      if (suspectedCheatromes.current >= 3) {
        console.warn("Suspicious activity detected. Game ended.")
        setEnded(true)
        return
      }
      return
    }

    clickCount.current++
    const burstId = Date.now() + Math.floor(Math.random() * 1000)
    setBursts((b) => [...b, { id: burstId, x: target.x!, y: target.y! }])
    setTimeout(() => {
      setBursts((b) => b.filter((bb) => bb.id !== burstId))
    }, 450)

    setSpiders((prev) => prev.filter((s) => s.id !== id))
    setFoundCount((c) => {
      const next = c + 1
      if (next >= TARGET_SPIDERS && !ended) {
        setWon(true)
        setEnded(true)
      }
      return next
    })
    try {
      audioRef.current?.play()
    } catch {}
  }

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  return (
    <BackgroundBeamsWithCollision className="relative overflow-hidden">
      {/* Background image layer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "url(/images/game-bg-2025.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "saturate(1.1)",
        }}
      />
      {/* Vignette overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      {/* Spotlight accent */}
      <Spotlight className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      {alreadyPlayed ? (
        <main className="min-h-screen flex items-center justify-center">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/15 bg-black/80 p-8 backdrop-blur-md text-center text-white">
            <div className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              You have already played this game.
            </div>
            <div className="text-lg md:text-xl mb-6 text-orange-100/90">
              Thank you for playing Halloween Hunt 2025!
            </div>
          </div>
        </main>
      ) : (
        <main className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center text-white select-none">
          {/* Header */}

          <motion.div
            className="mt-4"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: started || ended ? 0.3 : 1,
              scale: started || ended ? 0.7 : 1,
              y: started || ended ? -200 : -10,
              rotate: [-7, 7, -7, 7, -7],
            }}
            transition={{
              duration: 1,
              rotate: {
                repeat: Infinity,
                type: "tween",
                duration: 3,
              },
              delay: 0,
            }}
          >
            <Image
              src={"/images/game-logo.svg"}
              alt=""
              width={600}
              height={200}
              className="mx-auto"
            />
            <div className="text-center opacity-90 mt-10">
              <div
                className="text-5xl md:text-6xl font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-orange-300 via-amber-200 to-rose-200 bg-clip-text text-transparent drop-shadow-[0_3px_12px_rgba(0,0,0,0.35)]"
                style={{
                  textShadow:
                    "0 0 6px rgba(255,255,255,0.35), 0 1px 6px rgba(255,165,0,0.35)",
                }}
              >
                Halloween Hunt 2025
              </div>
              <div className="mt-3 text-xl md:text-3xl italic text-orange-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                Find the hidden spiders across the haunted scene
              </div>
            </div>
          </motion.div>

          {/* Timer + Score */}
          {started && !ended && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-5 py-3 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md font-mono"
            >
              <div className="flex items-end gap-2 text-orange-50">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest opacity-70">
                    Minutes
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {minutes}
                  </div>
                </div>
                <div className="text-2xl font-bold tabular-nums">:</div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest opacity-70">
                    Seconds
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                </div>
              </div>
              <div className="text-xl">
                Found:
                <span className="ml-2 px-2 py-0.5 rounded bg-orange-500/20 text-orange-200 font-bold">
                  {foundCount}
                </span>
              </div>
            </motion.div>
          )}

          {/* Start CTA */}
          {!started && !ended && (
            <motion.button
              initial={{
                y: 200,
                opacity: 0,
              }}
              animate={{
                y: 50,
                opacity: 1,
                scale: [1, 1.2, 0.8, 1.2, 1],
                x: 20,
              }}
              transition={{
                delay: 2.5,
                scale: {
                  repeat: Infinity,
                  duration: 1,
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="relative z-50 flex items-center justify-center w-[400px] h-[150px] select-none mt-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              style={{
                backgroundImage: "url(/images/button-bg.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span className="font-eater text-4xl tracking-[4px] font-bold">
                START GAME
              </span>
            </motion.button>
          )}

          {/* Ambient floating decorations */}
          <AnimatePresence>
            {started && !ended && (
              <>
                <motion.div
                  key="bat1"
                  initial={{ x: -100, y: 80, opacity: 0 }}
                  animate={{ x: "110%", y: 40, opacity: 0.4 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="fixed top-20 left-0 text-4xl select-none"
                  aria-hidden
                >
                  🦇
                </motion.div>
                <motion.div
                  key="bat2"
                  initial={{ x: "110%", y: 300, opacity: 0 }}
                  animate={{ x: -100, y: 260, opacity: 0.35 }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="fixed top-40 right-0 text-3xl select-none"
                  aria-hidden
                >
                  🦇
                </motion.div>
                <motion.div
                  key="web"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ duration: 2 }}
                  className="fixed top-6 right-6 text-4xl select-none"
                  aria-hidden
                >
                  🕸️
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Spiders Layer */}
          <div className="pointer-events-none fixed inset-0">
            <AnimatePresence>
              {spiders.map((s) => (
                <motion.button
                  key={s.id}
                  initial={{
                    scale: 0,
                    rotate: (s.rotate ?? 0) - 10,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    rotate: s.rotate ?? 0,
                    opacity: 1,
                    y: [0, -10, 0, 10, 0],
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 2.4 + (s.wobbleOffset ?? 0),
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.15, rotate: (s.rotate ?? 0) + 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCollect(s.id)}
                  className="absolute pointer-events-auto cursor-pointer drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <span className="sr-only">Spider</span>
                  <span style={{ fontSize: s.size ?? 32 }}>🕷️</span>
                </motion.button>
              ))}
            </AnimatePresence>
            {/* Click bursts */}
            <AnimatePresence>
              {bursts.map((b) => (
                <motion.span
                  key={b.id}
                  initial={{ opacity: 0.6, scale: 0 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute rounded-full border-2 border-orange-400/70"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: 24,
                    height: 24,
                    marginLeft: -12,
                    marginTop: -12,
                  }}
                  aria-hidden
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Results */}
          {ended && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="mx-4 w-full max-w-md rounded-2xl border border-white/15 bg-black/60 p-8 backdrop-blur-md text-center">
                <div className="text-3xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  {won ? "You Win!" : "Time's Up!"}
                </div>
                <div className="text-lg md:text-2xl mb-6 text-orange-100/90">
                  You found
                  <span className="mx-2 px-2 py-0.5 rounded bg-orange-500/20 text-orange-200 font-bold">
                    {foundCount}
                  </span>
                  {won ? " spiders!" : " spiders in 5 minutes."}
                </div>
                {won && (
                  <div className="text-sm md:text-xl mb-6 text-orange-100/80 font-mono">
                    Time left: {minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                )}
              </div>
              <CongratulationParticles id="halloween-2025-confetti" />
            </motion.div>
          )}
        </main>
      )}

      {/* Click sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/audios/clicked-play.mp3" type="audio/mpeg" />
      </audio>
    </BackgroundBeamsWithCollision>
  )
}
