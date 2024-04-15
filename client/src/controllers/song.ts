import type { IPlaylist } from "#types/playlist"
import { type ISong } from "#types/song"

import { ADDR } from "@constants"

export class SongsAPI {

  public static GET = class GET {

    /**
     * Gets all the 
     * @returns 
     */
    public static async all() {
      const req = await fetch(`http://${ADDR}:5000/songs`)
      const res: ISong[] = await req.json()

      return res
    }

    /**
     * Get all the songs inside a playlist (based in the name passed as argument).
     * Points to `/playlists/:pname` route
     * @param playlistID Name of the requested playlist
     * @returns The songs contained in a playlist
     */
    public static async allFromPlaylist(playlistID: number) {
      const req = await fetch(`http://${ADDR}:5000/songs/from/playlist/${playlistID}`)
      const res: ISong[] = await req.json()

      return res
    }

    public static async allFromArtist(artistID: number) {
      const req = await fetch(`http://${ADDR}:5000/songs/from/artist/${artistID}`)
      const res: ISong[] = await req.json()

      return res
    }
  }

  public static POST = class POST {
    /**
     * Sends data to the server to be saved into database
     * @param playlist the playlist where the song will be saved
     * @param song the song which will be saved
     */
    public static async insertInto(playlist: IPlaylist, song: ISong) {
      const req = await fetch(`http://${ADDR}:5000/songs/insert/${playlist.id}`, {
        method: "POST",
        body: JSON.stringify(song)
      })
    }
  }
}