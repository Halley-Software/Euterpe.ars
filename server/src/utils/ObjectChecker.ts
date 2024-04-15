import { ISong } from "#types/song"

function checkSong(song: ISong): song is ISong {
  return Array.isArray(song.artist)
}