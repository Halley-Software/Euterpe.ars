import { type IArtist } from "#types/artist"
import { artistRepo } from "../db/data-sources.js"

import { Artist } from "../db/models/artist.js"

export class ArtistsController {
  public static GET = class GET {
    /**
     * Returns all the registered artists and the songs that belongs to
     * @returns All the artists
     */
    public static async all() {
      return await artistRepo.find()
    }

    public static async byID(artistID: number) {
      return await artistRepo.findOneBy({ id: artistID })
    }
  }

  public static POST = class POST {
    /**
     * Inserts a new Artist into the database
     */
    public static async insert(artistFields: IArtist) {
      const artistProto = new Artist()

      artistProto.name = artistFields.name
      artistProto.size = artistFields.size

      return await artistRepo.save(artistProto)
    }
  }
}