import { useEffect, useState, type ChangeEvent } from "react"
import { useStore } from "@nanostores/react"

import Slider from "../Slider"
import Controls from "../core/Controls"

// Gif from https://tenor.com/es-MX/view/singing-rapping-left-up-right-gif-27323004
//import singing from "../../../public/singing-rapping.gif"
import { /* MUSIC_NOT_FOUND_MESSAGES, */ VOLUME_MAX_DIVIDER } from "@constants"
import { useInterval } from "@hooks/custom"
import localStorageModel from "@models/localstorage.model"
import playerModel from "@models/player.model"
import { playlist, song } from "@nano/player"

function SpeakerIcon() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-device-speaker"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
      <path d="M12 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 7l0 .01" />
    </svg>
  )
}

/**
 * Represents the most important part of the app.
 * 
 * A player that manage the state of the songs the be played and show informations about the actual song being played.
 * 
 * The `Player` consist of the next parts:
 *  - A 'section' where info about the actual song being played is displayed, like the name or the author
 *  - The `Controls` component, which is responsible of: play/stop the actual song, move through the loaded songs in a `DoubleLinkedList`
 *  - A `HTMLInputElement` that manage the song by the setted position
 * 
 * The `Player` is also reponsible of fetch the songs contained by the playlist that is being played
 */
function Player() {
  const [volume, setVolume] = useState(0)
  const [previousVolume, setPreviousVolume] = useState(volume)

  const $song = useStore(song)
  const $playlist = useStore(playlist)

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSong = song.get()

    if (currentSong) {
      setVolume(parseInt(e.currentTarget.value))
      currentSong.info.audio.volume = parseInt(e.currentTarget.value) / VOLUME_MAX_DIVIDER
    }
  }

  /**
   * Executes at component first component render
   */
  useEffect(() => {
    const lastPlaylist = localStorageModel.getLastPlaylist()
    const savedVolume = localStorageModel.getVolume()
    const resolvedSavedVolume = savedVolume ?? "20"

    setVolume(parseInt(resolvedSavedVolume))
    setPreviousVolume(parseInt(resolvedSavedVolume))

    if (lastPlaylist === null) {
      localStorageModel.setLastPlaylist("1")
      playerModel.loadPlaylist(parseInt("1"))
    } else
      playerModel.loadPlaylist(parseInt(lastPlaylist))
  }, [])

  // Checks every 5 seconds if the saved audio is equal to the new volume
  // if is equal, doesn't anyting, else, saves the new volume into localStorage
  useInterval(() => {
    if (previousVolume !== volume)
      localStorageModel.saveVolume(String(volume))
  }, 5000)

  //https://i.kym-cdn.com/entries/icons/facebook/000/037/848/cover2.jpg

  return (
    <div className="flex flex-row justify-center h-28 mb-5 items-center">
      <div className="mr-auto ml-10 border-white border-solid">
        <div>
          {$playlist ? (
            <div className="flex flex-row gap-4 items-center">
              <img className="w-[100px] h-[100px] object-cover max-w-[100px] max-h-[100px]" src={$playlist.image_url} />
              {$song ? (
                <div className="flex flex-col gap-2">
                  {$song.info.artist.map(artist => <a key={artist.id} className="hover:underline" href={`http://localhost:4321/artists/${artist.id}`}>{artist.name}</a>)}
                  <span>{$song.info.name}</span>
                </div>
              ) : (
                $playlist.songs.count() > 0 ? (
                  <span className="text-xs">
                    No se puede reproducir el contenido en <br/>
                    <a className="font-bold hover:underline" href={`http://localhost:4321/playlist/${$playlist.id}}`}>{$playlist.name}</a>
                  </span>
                ) : (
                  <span className="text-xs">No hay canciones añadidas en {$playlist.name}</span>
                )
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div>
				<Controls />
      </div>
      <div className="ml-auto mr-10 flex flex-row gap-4 align-bottom">
        <SpeakerIcon />
        <Slider
          minValue={0}
          maxValue={100}
          initialValue={volume}
          changeHandler={handleVolume}
          className="w-24 accent-white"
        />
      </div>
    </div>
  )
}

export default Player