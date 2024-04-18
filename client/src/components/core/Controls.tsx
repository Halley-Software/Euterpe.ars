import {
  useEffect,
  useState,
  type ChangeEvent
} from "react"

import { useStore } from "@nanostores/react"

// store (global state)
import { playlist, isPaused, song } from "@nano/player.ts"

// Buttons and other SVG's
import Loader from "@components/svgs/react/Loader"
import PlayButton from "@components/svgs/react/PlayButton"
import StopButton from "@components/svgs/react/StopButton"
import PreviousButton from "@components/svgs/react/PreviousButton"
import NextButton from "@components/svgs/react/NextButton"

import Slider from "../Slider"
import { useInterval } from "@hooks/custom"

import PlayerModel from "@models/player.model"
import type { Node } from "@utils/DoubleLinkedList/DoubleLinkedList"
import type { PlayableSong } from "@ctypes/ClientPlaylist"
import { In } from "@utils/utils"

function RandomSelection({ randomSong }: { randomSong: boolean }){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-shuffle"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path stroke={randomSong ? "rgb(22 163 74)" : "#ffffff"} d="M18 4l3 3l-3 3" />
      <path stroke={randomSong ? "rgb(22 163 74)" : "#ffffff"} d="M18 20l3 -3l-3 -3" />
      <path stroke={randomSong ? "rgb(22 163 74)" : "#ffffff"} d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
      <path stroke={randomSong ? "rgb(22 163 74)" : "#ffffff"} d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
    </svg>
  )
}

function RepeatButton({ mustRepeat }: { mustRepeat: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path stroke={mustRepeat ? "rgb(22 163 74)" : "#ffffff"} d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
      <path stroke={mustRepeat ? "rgb(22 163 74)" : "#ffffff"} d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
    </svg>
  )
}

/**
 * Represents a group of button to controls the songs in the `DoubleLinkedList`
 * 
 * The principal components in this componentes are:
 *  - A previous button, to go back to the previous song
 *  - A play/stop button, to handle the state of the actual played song
 *  - A next button, to advance to the next song
 * 
 *  Another important part, is an `HTMLInputElement` of `range` type, that represents the actual position of the song in her own duration.
 *  By move the `HTMLInputElement`, we can control the song part that is being played (relative on his duration)
 * 
 */
function Controls() {
  const [time, setTime] = useState(0)
  const [mustRepeat, setMustRepeat] = useState(false)
  const [random, setRandom] = useState(false)
  const [array] = useState<Array<number>>([])

  const $song = useStore(song)
  const $isPaused = useStore(isPaused)

  /**
   * Sets a new position for `HTMLInputElement`, in this way, plays the new part of the actual played song
   * @param e Event of the input change
   */
  const durationHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSong = song.get()
    const newTime = parseInt(e.currentTarget.value)

    if (currentSong) {
      setTime(newTime)
      currentSong.info.audio.currentTime = newTime
    }
  }

  const resetAudioProps = () => {
    const currentSong = song.get()

    if (currentSong) {
      currentSong.info.audio.pause()
      currentSong.info.audio.currentTime = 0
    }
  }

  const configureNextAudio = async (next: Node<PlayableSong>) => {
    const currentSong = song.get()

    if (currentSong) {
      resetAudioProps()
      next.info.audio.volume = currentSong.info.audio.volume
      song.set(next)
      await next.info.audio.play()
    }
  }

  // see PlayerModel.previous
  const previousSongs = () => {
    const currentSong = song.get()

    if (currentSong?.previousNode)
      configureNextAudio(currentSong.previousNode)
  }

  const handleStop = () => PlayerModel.stop()

  const nextSong = () => {
    const currentSong = song.get()

    if (currentSong?.nextNode)
      configureNextAudio(currentSong.nextNode)
  }

  const handleRepeatable = () => setMustRepeat(!mustRepeat)

  const handleRandom = () => setRandom(!random)

  useInterval(() => {
    const currentSong = song.get()
    const currentPlaylist = playlist.get()

    if (currentSong && currentPlaylist) {
      setTime(currentSong.info.audio.currentTime)

      if (currentSong.info.audio.currentTime === currentSong.info.audio.duration) {
        if (currentSong.isLast() && mustRepeat)
          configureNextAudio(currentPlaylist.songs.begin!)

        if (random) {
          const playlistLength = currentPlaylist.songs.count()
          let randomSong = currentPlaylist.songs.getByIdx(Math.floor(Math.random() * playlistLength))
          array.push(currentSong.index)

          if (array.length === playlistLength)
            while(array.length > 0)
              array.pop();

          while (In(randomSong?.index, array)) {
            randomSong = currentPlaylist.songs.getByIdx(Math.floor(Math.random() * playlistLength))
          }

          // safety non-null assert: the list have at least 1 node at this point
          // according to the first validation (currentSong && currentPlaylist)
          configureNextAudio(randomSong!)
        }

        if (currentSong.nextNode)
          configureNextAudio(currentSong.nextNode)
      }
    }
  }, 1000)

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-row gap-6 items-center justify-center">
        <button onClick={handleRandom}>
          <RandomSelection randomSong={random} />
        </button>
        <button onClick={previousSongs}>
          <PreviousButton />
        </button>
        <button
          className="p-1.5 transition transform active:scale-90 hover:scale-105 bg-white rounded-[50%]"
          onClick={handleStop}
        >
          {$song ? $isPaused ? <StopButton /> : <PlayButton /> : <Loader />}
        </button>
        <button onClick={nextSong}>
          <NextButton />
        </button>
        <button onClick={handleRepeatable}>
          <RepeatButton mustRepeat={mustRepeat} />
        </button>
      </div>
      <div>
        <Slider
          minValue={0}
          maxValue={$song ? Math.floor($song.info.duration) : 0}
          initialValue={time}
          changeHandler={durationHandler}
          className="rounded-3xl w-80 accent-green-600"
          showLimits
        />
      </div>
    </div>
  )
}

export default Controls
