import { type IPlaylist } from "#types/playlist"

import { ADDR } from "@constants"

export class PlayListsAPI {
  public static GET = class GET {
    /**
     * Get all the available playlists and how many songs they has.
     * Points to `/playlists` route
     * @returns The playlists and the quantity of them
     */
    public static async all() {
      const req = await fetch(`http://${ADDR}:5000/playlists`)
      const res: IPlaylist[] = await req.json()

      return res
    }

    public static async byID(playlistID: number) {
      const req = await fetch(`http://${ADDR}:5000/playlists/${playlistID}`)
      const res: IPlaylist = await req.json()

      return res
    }
  }
}