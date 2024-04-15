import { type ISong } from "#types/song"
import { In } from "typeorm"

import { artistRepo, playlistRepo, songRepo } from "../db/data-sources.js"

import { Song } from "../db/models/song.js"

export class SongsController {
  public static GET = class GET {
    /**
     * Fetchs all the songs in the database
     */
    public static async all() {
      return await songRepo.find({
        relations: {
          artist: true
        }
      })
    }

    /**
     * Gets all the songs in the playlist `playListName`
     * @param playListName playlist name which will request all the songs
     */
    public static async allFromPlaylist(playlistID: number) {
      return await songRepo.find({
        relations: {
          playlist: true,
          artist: true,
        },
        where: { playlist: { id: playlistID } }
      })
    }

    /**
     * Gets all the songs that belongs to the artist called `artistName`
     * @param artistID The name of the artist which want to get the songs
     */
    public static async allFromArtist(artistID: number) {
      return await songRepo.find({
        relations: {
          artist: true
        },
        where: { artist: { id: artistID } }
      })
    }
  }

  public static POST = class POST {
    public static async insert(newSong: ISong) {
      const songProto = new Song()

      songProto.name = newSong.name
      songProto.url = newSong.url
      songProto.duration = newSong.duration
      songProto.artist = await artistRepo.findBy({ name: In(newSong.artist.map(artist => artist.name)) })
      songProto.playlist = await playlistRepo.findBy({ name: newSong.playlist[0].name }) //? FIX: playlist should be passed as an array

      return await songRepo.save(songProto)
    }
  }
}