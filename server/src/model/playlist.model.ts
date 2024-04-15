import { type ISong } from "#types/song"
import { type IPlaylist } from "#types/playlist"
import { playlistRepo } from "../db/data-sources.js"

import { Playlist } from "../db/models/playlist.js"

export class PlaylistsController {
  public static GET = class GET {
    /**
     * Used at `/playlists` route
     * 
     * Returns all the existents playlists
     * 
     * @returns All the playlists in the database
     */
    public static async all() {
      return await playlistRepo.find()
    }

    public static async byID(playlistID: number) {
      return await playlistRepo.findOne({ where: { id: playlistID } })
    }
  }

  public static POST = class POST {
    /**
     * Adds a new record to the SONG_PLAYLISTS table
     * That is the same add a song to a playlist
     * @param playlist The info of the new playlist: { ID_PLAYLIST, NAME }
     * @returns The data of the created playlist
     */
    public static async insert(playlist: IPlaylist) {
      const playlistProto = new Playlist()

      playlistProto.name = playlist.name
      playlistProto.image_url = playlist.image_url,
      playlistProto.size = playlist.size

      return await playlistRepo.save(playlistProto)
    }

    /**
     * TODO: Implements endpoint to place songs in playlists
     * 
     * Adds a new song to the indicated playlist
     * @param song The info of the new song being added: {ID_PLAYLIST, ID_SONG}
     * @returns The data of the inserted song
     */
    public static async insertInto(song: Partial<ISong>) {
    }
  }
}