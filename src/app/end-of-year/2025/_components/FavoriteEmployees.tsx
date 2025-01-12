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
    const interval = setInterval(() => {
      setRandomProgress((prevState) =>
        prevState.map((employee, i) => {
          const shouldIncrease =
            Math.random() >
            (employee.maxProgress > 20
              ? 0.2
              : 1 - (employee.maxProgress + 20) / 100)
          if (shouldIncrease || employee.maxProgress > 25)
            return {
              ...employee,
              currentProgress: Math.min(
                employee.maxProgress,
                employee.currentProgress +
                  (prevState[3].currentProgress > 25 && i === 4
                    ? Math.random() * 10
                    : Math.random()) /
                    (employee.maxProgress > 25 ? 2 : 1)
              ),
            }
          return employee
        })
      )
    }, 300)

    return () => clearInterval(interval)
  }, [resultStage])

  useEffect(() => {
    if (
      randomProgress.filter((employee) => employee.currentProgress > 17)
        .length >= 2
    )
      setResultStage(2)
    if (
      randomProgress.every(
        (employee) => employee.currentProgress === employee.maxProgress
      )
    )
      setResultStage(3)
  }, [randomProgress])

  const isShowOnlyTwo = resultStage >= 2
  const isShowWinner = resultStage >= 3

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
              duration: 0.5,
              y: {
                delay: 1 + index * 0.5,
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
            className={cn("flex items-center font-sans relative", {
              "flex-col": isShowOnlyTwo,
            })}
          >
            <div className="flex items-end gap-2">
              {!isShowOnlyTwo && (
                <span className="w-7 text-xl font-bold italic tracking-wider text-[#ffe2ac] text-right mr-3">
                  {index + 1}
                  {"."}
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
                      className="absolute left-0 top-0 flex items-center gap-2 text-xl font-bold tracking-wider text-[#fcb65a] border border-[#db6b21] bg-black/60 p-2"
                      initial={{
                        opacity: 0,
                        rotate: -45,
                        x: 600,
                        y: -600,
                      }}
                      animate={{
                        opacity: 1,
                        x: 10,
                        y: 50,
                        scale: [1, 1.5, 1.2],
                      }}
                      transition={{
                        scale: {
                          repeat: Infinity,
                        },
                      }}
                    >
                      <p>WINNER</p>
                      <Image
                        src={"/images/end-of-year-2025/award.png"}
                        width={30}
                        height={30}
                        alt="cup"
                      />
                    </motion.div>
                  )}
              </div>
            </div>
            {!isShowOnlyTwo ? (
              <div className="relative flex h-full flex-1 items-center">
                <div className="h-full">
                  <div className="progress-infinite absolute bottom-0 left-0 right-0 h-full">
                    <div
                      className="progress-bar3 flex items-center justify-center"
                      style={{
                        width: `calc(${employee.currentProgress}% * 1.7 + 195px)`,
                      }}
                    >
                      <motion.p
                        className={cn(
                          "text-base font-bold italic tracking-wider text-[#ffe2ac]"
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
                  {/* {employee.name} */}
                  <span className="ml-3 text-base font-bold italic tracking-wider text-[#f87224]">
                    {employee.currentProgress === 0
                      ? 0
                      : employee.currentProgress.toFixed(2)}
                    %
                  </span>
                </motion.p>
              </div>
            ) : (
              <div>
                <motion.p className="text-center text-2xl font-bold italic tracking-wider text-[#ffe2ac]">
                  {employee.name}
                </motion.p>
                <motion.p className="text-center text-3xl font-bold italic tracking-wider text-[#f87224]">
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
