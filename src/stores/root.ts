import { CARDS } from "@/constants/cards"
import { create } from "zustand"

type Store = {
  state: "idle" | "playing" | "started" | "win" | "gameOver"
  cards: {
    id: number
    opened: boolean
    imageUrl: string
  }[]
  setStore: (newState: Partial<Store>) => void
  triggerCard: (id: number) => void
}

export const useStore = create<Store>((set) => ({
  state: "idle",
  cards: CARDS,
  setStore: (newState: Partial<Store>) =>
    set((state) => ({ ...state, ...newState })),
  triggerCard: (id: number) =>
    set((state) => ({
      ...state,
      cards: state.cards.map((card) => {
        if (card.id === id)
          return {
            ...card,
            opened: !card.opened,
          }
        return card
      }),
    })),
}))
