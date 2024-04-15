import type { MouseEvent } from "react"

import { useStore } from "@nanostores/react"
import { isPaused, playlist, song } from "@nano/player"

import type { IPlaylist } from "#types/playlist"

import playerModel from "@models/player.model"
import localStorageModel from "@models/localstorage.model"

interface Props {
  pl: IPlaylist, // doesnt need PlayablePlaylist, because the HTMLAudioElement is doesnt needed here
  songsCount: number
}

function SpeakerIcon() {
  return (
    <svg
      className="ml-auto"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="rgb(34 197 94)"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 8a5 5 0 0 1 0 8" />
      <path d="M17.7 5a9 9 0 0 1 0 14" />
      <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
    </svg>
  )
}

function PlaylistAsideCard({ pl, songsCount }: Props) {

  const $isPaused = useStore(isPaused)
  const $playlist = useStore(playlist)
  const $song = useStore(song)

  const setPlaylist = (e: MouseEvent) => {
    e.preventDefault()
    const currentPlaylist = playlist.get()
    const currentSong = song.get()
    
    if (currentPlaylist)
      if (pl.id !== currentPlaylist.id) {
        if (currentSong)
          currentSong.info.audio.pause()

        localStorageModel.setLastPlaylist(String(pl.id))
        playerModel.loadPlaylist(pl.id, true)
      }
  }

  return (
    <article
      id="article-section"
      onDoubleClick={setPlaylist}
      className={
        `flex flex-row items-center content-center select-none hover:bg-white hover:bg-opacity-30 rounded-lg p-2 
        ${$playlist ? pl.id === $playlist.id ? "bg-white bg-opacity-30 rounded-lg" : null : null}`
      }>
      <div onDoubleClick={setPlaylist} className="flex flex-col">
        <a href={`/playlists/${pl.id}`} className="hover:underline hover:underline-offset-2 w-min">
          <h1 className="w-min">{pl.name}</h1>
        </a>
        <h3>
          {songsCount} {songsCount > 1 || songsCount === 0 ? "canciones" : "cancion"}
        </h3>
      </div>
      { $playlist && $song ? pl.id === $playlist.id && $isPaused ? <SpeakerIcon /> : null : null }
    </article>
  )
}

export default PlaylistAsideCard