import { Halley } from "@laniakeajs/halley.http"
import { seq } from "./db/connection.js"

import { Artist } from "./db/models/artist.ts"
import { PlayList } from "./db/models/playlist.ts"
import { Song } from "./db/models/song.ts"
import { SongPlaylist } from "./db/models/recursesongs/songplaylist.ts"
import { SongArtist } from "./db/models/recursesongs/songartist.ts"

import artistRouter from "./routes/artist.ts"
import playListRouter from "./routes/playlist.ts"

/**
 * TODOS:
 *  Make a default record of a Playlist, therefore, a SongPlaylist
 */

/**
 * Redefined method `ready`
 * 
 * It do the same that that his `super` method but before listen requests, checks if the database is avaiable
 */
class CHalley extends Halley {
  ready(port, options) {
    const authTest = seq.authenticate({
      retry: {
        max: 5,
        report: (message, _, __) => {
          console.error(message)
        }
      }
    })

    authTest
      .then(() => {
        Promise.all([
          Song.sync(),
          Artist.sync(),
          SongArtist.sync(),

          PlayList.sync(),
          SongPlaylist.sync()
        ]).then(() => {
          
          /**
           * |------------------------------------------------|
           * |   ARTIST                         PLAYLISTS     |
           * |     |                                |         |
           * |     |                                |         |
           * | SONG_ARTISTS ----- SONGS ----- SONG_PLAYLISTS  |
           * |------------------------------------------------|
           */

          // Artist and Playlists table relations
            // A Playlist has 1 list of multiple songs
            PlayList.hasOne(SongPlaylist, { foreignKey: "ID_PLAYLIST" })
            // An Artist has 1 list of multiple of songs (where that artist have ownership over those songs)
            Artist.hasOne(SongArtist, { foreignKey: "ID_ARTIST" })


          // SONG_ARTIST and SONG_PLAYLISTS table relations
            // 1 list of multiple songs belongs to a playlist
            SongPlaylist.belongsTo(PlayList, { foreignKey: "ID_PLAYLIST" })
            // 1 list of multiple songs belongs to a artist (where that artist have ownership over those songs)
            SongArtist.belongsTo(Artist, { foreignKey: "ID_ARTIST" })


            // 1 list of a playlist have multiple songs
            SongPlaylist.hasMany(Song, { foreignKey: "ID_SONG" })
            // 1 list of songs of an author have multiple songs
            SongArtist.hasMany(Song, { foreignKey: "ID_SONG" })

          // SONGS table relation with her neighbours tables
            // A Song can be part of multiple list of songs of a Playlist
            Song.hasMany(SongPlaylist, { foreignKey: "ID_SONG" })
            // A Song is part of 1 list of songs of an Artist
            Song.belongsTo(SongArtist, { foreignKey: "ID_SONG" })
        })
      })
      .catch(error => console.error(`an error has occur ${error}`))
    
    return super.ready(port, options)
  }
}

const app = new CHalley()

app.register(CHalley.rawBodyParser())

app.use(artistRouter)
app.use(playListRouter)

export default app