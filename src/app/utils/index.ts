import { Card } from "@/constants/cards"

export const shuffleArray = (array: Card[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Tạo một chỉ số ngẫu nhiên từ 0 đến i
    const j = Math.floor(Math.random() * (i + 1))

    // Hoán đổi vị trí của phần tử thứ i và phần tử ngẫu nhiên j
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
