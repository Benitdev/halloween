import { AUDIOS } from "@/constants/audios"
import { useStore } from "@/stores/root"
import { useEffect } from "react"

export const Audio = () => {
  const { state } = useStore()

  useEffect(() => {
    if (state !== "idle") return
    const timer = setTimeout(
      () => (document.getElementById("audio") as HTMLAudioElement)?.play(),
      5000
    )
    return () => clearTimeout(timer)
  }, [state])

  return (
    <audio id="audio" key={`/audios/${AUDIOS[state]}`} loop>
      <source src={`/audios/${AUDIOS[state]}`} type="audio/mpeg"></source>
    </audio>
  )
}
