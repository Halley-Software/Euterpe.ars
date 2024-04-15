import { type IArtist } from "#types/artist"
import { type ISong } from "#types/song"

import { ADDR } from "src/global/CONSTANTS"

export class ArtistsAPI {
  public static GET = class GET {
    /**
     * Points to `/artists` route
     * 
     * Fetchs all the available artist
     * @returns All the available artist
     */
    public static async all() {
      const req = await fetch(`http://${ADDR}:5000/artists`)
      const res: IArtist[] = await req.json()

      return res
    }

    public static async byID(artistID: number) {
      const req = await fetch(`http://${ADDR}:5000/artists/${artistID}`)
      const res: IArtist = await req.json()

      return res
    }
  }
}