import { useState } from "react"

export const useMultiPlay = () => {

    const [playingId, setPlayingId] = useState<string | null>(null)
    const [playing, setPlaying] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)

    const play = (id: string) => {
        if (playingId !== id) {
            setPlayingId(id)
            setTime(0)
        }
        setPlaying(true)
    }

    const pause = (id: string) => {
        if (playingId !== id) {
            return
        }
        setPlaying(false)
    }

    const toggle = (id: string) => {
        if (isPlaying(id)) {
            pause(id)
        } else {
            play(id)
        }
    }

    const isPlaying = (id: string) => playing && playingId === id

    return { play, pause, playing, playingId, isPlaying, time, setTime, toggle }

}