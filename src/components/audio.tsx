import { AUDIOS } from "@/constants/audios"
import { useStore } from "@/stores/root"

export const Audio = () => {
  const { state } = useStore()

  return (
    <audio key={`/audios/${AUDIOS[state]}`} autoPlay loop>
      <source src={`/audios/${AUDIOS[state]}`} type="audio/mpeg"></source>
    </audio>
  )
}
