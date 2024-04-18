import type { PlayablePlaylist, PlayableSong } from "@ctypes/ClientPlaylist"
import { PlayListsAPI } from "@controllers/playlist"
import { SongsAPI } from "@controllers/song"
import { DoubleLinkedList } from "@utils/DoubleLinkedList/DoubleLinkedList"
import { b64ToBlob } from "@utils/utils"

import { ADDR, VOLUME_MAX_DIVIDER } from "@constants"
import { isPaused, playlist, song } from "@nano/player"

import localStorageModel from "./localstorage.model"

export default {
  stop: async function stop() {
    const actualSong = song.get()
    const isPausedVal = isPaused.get()
    if (actualSong) {
      isPausedVal ? actualSong.info.audio.pause() : await actualSong.info.audio.play()
      isPaused.set(!isPausedVal)
    }
  },

  getAudio: async function getAudio(url: string) {
    const req = await fetch(`http://${ADDR}:5003/simple`, {
      method: "POST",
      body: JSON.stringify({
        SOURCE_URL: url
      })
    })

    const audio = document.createElement("audio")
    audio.src = URL.createObjectURL(b64ToBlob(await req.text()))

    const savedVolume = localStorageModel.getVolume()
    audio.volume = savedVolume === null ? 20 / VOLUME_MAX_DIVIDER : parseInt(savedVolume) / VOLUME_MAX_DIVIDER
    audio.pause()

    return audio
  },

  loadPlaylist: async function loadPlaylist(playlistID: number, shouldStart?: boolean) {

    // safe type casting conversion: the new fields are filleds
    const newPlaylist = await PlayListsAPI.GET.byID(playlistID) as PlayablePlaylist
    const songs = await SongsAPI.GET.allFromPlaylist(playlistID) as PlayableSong[]

    const audioedSong = await Promise.all(songs.map(async song => {
      song.audio = await this.getAudio(song.url)
      return song
    }))

    if (audioedSong.length !== 0) {
      if (shouldStart)
        await audioedSong[0].audio.play()
    }

    newPlaylist.songs = new DoubleLinkedList(audioedSong)

    playlist.set(newPlaylist)
    song.set(newPlaylist.songs.begin)

    return newPlaylist
  }
}