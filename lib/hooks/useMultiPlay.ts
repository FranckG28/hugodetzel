import { useState } from "react"

export const useMultiPlay = () => {

    const [playingId, setPlayingId] = useState<string | null>(null)
    const [playing, setPlaying] = useState<boolean>(false)

    const play = (id: string) => {
        if (playingId !== id) {
            setPlayingId(id)
        }
        setPlaying(true)
    }

    const pause = (id: string) => {
        if (playingId !== id) {
            return
        }
        setPlaying(false)
    }

    const isPlaying = (id: string) => playing && playingId === id

    return { play, pause, playing, playingId, isPlaying }

}