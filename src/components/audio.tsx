import { AUDIOS } from "@/constants/audios"
import { useStore } from "@/stores/root"
import { useEffect } from "react"

export const Audio = () => {
  const { state } = useStore()

  useEffect(() => {
    const timer = setTimeout(
      () => (document.getElementById("audio") as HTMLAudioElement)?.play(),
      2000
    )
    return () => clearTimeout(timer)
  }, [state])

  return (
    <audio id="audio" key={`/audios/${AUDIOS[state]}`} loop autoPlay>
      <source src={`/audios/${AUDIOS[state]}`} type="audio/mpeg"></source>
    </audio>
  )
}
