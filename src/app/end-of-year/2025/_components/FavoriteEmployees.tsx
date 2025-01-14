"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { EMPLOYEES } from "@/constants/end-of-year-2025"
import { Spotlight } from "@/components/ui/sportlight"
import { useStore } from "@/stores/root"
import CongratulationParticles from "@/components/ui/CongratulationParticles"

export const FavoriteEmployees = () => {
  const { state } = useStore()
  const [resultStage, setResultStage] = useState(0)
  const [randomProgress, setRandomProgress] = useState(
    EMPLOYEES.map((employee) => ({
      ...employee,
      currentProgress: 0, // Start progress at 0
      maxProgress: parseFloat(employee.progress), // Convert progress from string to number
    }))
  )

  useEffect(() => {
    if (state !== "playing") return
    setResultStage(1)
  }, [state])

  useEffect(() => {
    if (!resultStage) return
    const delay = resultStage >= 3 ? 100 : 800
    let step = 0
    const interval = setInterval(() => {
      step++
      setRandomProgress((prevState) =>
        prevState.map((employee, i) => {
          if (i === 13 && resultStage >= 3) {
            return {
              ...employee,
              currentProgress: Math.min(
                employee.maxProgress,
                employee.currentProgress + Math.random()
              ),
            }
          }
          if (i === 14 && resultStage >= 3 && step % 8) {
            return {
              ...employee,
              currentProgress: Math.min(
                employee.maxProgress,
                employee.currentProgress + Math.random()
              ),
            }
          }

          const isTopEmployee = [13, 14].includes(i)

          const shouldIncrease =
            isTopEmployee ||
            Math.random() > (employee.maxProgress > 5 ? 0.3 : 0.5)

          if (isTopEmployee && step < 10 && shouldIncrease && resultStage === 1)
            return {
              ...employee,
              currentProgress: Math.min(
                employee.maxProgress,
                employee.currentProgress + Math.random() / 10
              ),
            }

          // if (isTopEmployee && (step + i) % 2 === 0) {
          //   return {
          //     ...employee,
          //     currentProgress: Math.min(
          //       employee.maxProgress,
          //       employee.currentProgress +
          //         (Math.random() * (isTopEmployee ? 0.3 : 1) +
          //           (isTopEmployee ? 1.3 : 0))
          //     ),
          //   }
          // }
          if (shouldIncrease)
            return {
              ...employee,
              currentProgress: Math.min(
                employee.maxProgress,
                employee.currentProgress +
                  (Math.random() * (isTopEmployee ? 0.5 : 1) +
                    (isTopEmployee ? 0.5 : 0))
              ),
            }
          return employee
        })
      )
    }, delay)

    return () => clearInterval(interval)
  }, [resultStage])

  useEffect(() => {
    if (
      randomProgress.every(
        (employee) => employee.currentProgress === employee.maxProgress
      )
    ) {
      setResultStage(4)
      return
    }

    if (randomProgress[14].currentProgress > 23) {
      setResultStage(3)
      return
    }

    if (
      randomProgress.filter((employee) => employee.currentProgress > 17)
        .length >= 2
    ) {
      setResultStage(2)
      return
    }
  }, [randomProgress])

  const isShowOnlyTwo = resultStage >= 2
  const isSpeedUp = resultStage === 3
  const isShowWinner = resultStage >= 4

  const sortedEmployee = !isShowOnlyTwo
    ? randomProgress.toSorted((a, b) => b.currentProgress - a.currentProgress)
    : randomProgress.filter((employee) => employee.maxProgress > 25)

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
        className={cn("relative mx-auto !-mt-28 grid max-w-screen-lg gap-1", {
          "!mt-0 grid-cols-2 place-items-center": isShowOnlyTwo,
        })}
      >
        {sortedEmployee.map((employee, index) => (
          <motion.div
            layoutId={employee.avatar}
            key={employee.avatar}
            transition={{
              duration: 0.8,
              y: {
                delay: 1 + index * 0.1,
                duration: 0.5,
              },
            }}
            initial={{
              y: 2000,
            }}
            animate={{
              y: 0,
              scale:
                isShowWinner &&
                employee.avatar === "/images/end-of-year-2025/Top1.jpg"
                  ? 1.2
                  : 1,
            }}
            className={cn("flex items-center font-sans relative z-10", {
              "flex-col": isShowOnlyTwo,
            })}
          >
            <div className="flex items-end gap-2">
              {!isShowOnlyTwo && (
                <span className="w-7 text-xl font-bold italic tracking-wider text-[#ffe2ac] text-right mr-3">
                  {index + 1}
                </span>
              )}
              <div
                className={cn(
                  "relative grid h-[50px] w-[50px] place-items-center bg-gradient-to-r from-[#ffe2ac] via-[#7a410a] to-yellow-800 p-[2px] brightness-105",
                  {
                    "ml-0 h-[300px] w-[300px] rounded-lg p-1": isShowOnlyTwo,
                  }
                )}
              >
                <Image
                  src={employee.avatar}
                  width={isShowOnlyTwo ? 300 : 50}
                  height={isShowOnlyTwo ? 300 : 50}
                  alt="avatar"
                  className={cn("h-full w-full overflow-hidden object-cover", {
                    "ml-0 rounded-lg border-2 border-black": isShowOnlyTwo,
                  })}
                />
                {isShowWinner &&
                  employee.avatar === "/images/end-of-year-2025/Top1.jpg" && (
                    <motion.div
                      className="absolute left-0 top-0 flex items-center gap-2 text-xl font-bold tracking-wider text-[#f87224] border border-[#db6b21] bg-black/60 p-2 px-5 brightness-150"
                      initial={{
                        opacity: 0,
                        rotate: -35,
                        x: 600,
                        y: -600,
                      }}
                      animate={{
                        opacity: 1,
                        x: 60,
                        y: 120,
                        scale: [1, 1.5, 1.2],
                      }}
                      transition={{
                        scale: {
                          repeat: Infinity,
                        },
                      }}
                    >
                      <p>WINNER</p>
                    </motion.div>
                  )}
              </div>
            </div>
            {!isShowOnlyTwo ? (
              <div className="relative flex h-full flex-1 items-center">
                <div className="h-full">
                  <div className="progress-infinite absolute bottom-0 left-0 right-0 h-full">
                    <div
                      className="progress-bar3 flex items-center justify-center backdrop-blur-[3px]"
                      style={{
                        width: `calc(${employee.currentProgress}% * 1.7 + 195px)`,
                      }}
                    >
                      <motion.p
                        className={cn(
                          "text-base font-bold italic tracking-wider text-[#f87224] brightness-200"
                        )}
                      >
                        {employee.name}
                      </motion.p>
                    </div>
                  </div>
                </div>
                <motion.p
                  animate={{
                    left: `calc(${employee.currentProgress}% * 1.7 + 195px)`,
                  }}
                  className={cn(
                    "absolute text-xl font-bold italic tracking-wider text-[#ffe2ac]"
                  )}
                >
                  <span className="ml-3 text-base font-bold italic tracking-wider text-[#f87224] brightness-150">
                    {employee.currentProgress === 0
                      ? 0
                      : employee.currentProgress.toFixed(2)}
                    %
                  </span>
                </motion.p>
              </div>
            ) : (
              <div>
                <motion.p className="text-center text-2xl font-bold italic tracking-wider text-[#f87224] brightness-200">
                  {employee.name}
                </motion.p>
                <motion.p
                  animate={{
                    scale:
                      isSpeedUp &&
                      employee.avatar === "/images/end-of-year-2025/Top1.jpg"
                        ? [1.2, 1, 1.3, 1, 1.2]
                        : 1,
                  }}
                  transition={{
                    repeat: Infinity,
                  }}
                  className="text-center text-3xl font-bold italic tracking-wider text-[#f87224] brightness-150"
                >
                  {employee.currentProgress.toFixed(2)}%
                </motion.p>
              </div>
            )}
            {isShowWinner &&
              employee.avatar === "/images/end-of-year-2025/Top1.jpg" && (
                <motion.div
                  initial={{
                    y: -100,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                  }}
                >
                  <div
                    className="absolute -inset-32"
                    style={{ perspective: "1000px" }}
                  >
                    <CongratulationParticles />
                  </div>
                  <div className="card-shadow"></div>
                </motion.div>
              )}
          </motion.div>
        ))}
      </motion.div>
      {isShowOnlyTwo && (
        <>
          <Spotlight
            className="left-0 top-40 animate-spotlight md:-top-24 md:left-60"
            fill="#ffe2ac"
          />
          <Spotlight
            className="animate-spotlight-reverse right-0 top-40 md:-top-24 md:right-60"
            fill="#ffe2ac"
          />
        </>
      )}
    </>
  )
}
