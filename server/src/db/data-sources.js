import { conn } from "./connection.js"

import { Artist } from "./models/artist.ts"
import { Song } from "./models/song.ts"
import { Playlist } from "./models/playlist.ts"
import { User } from "./models/user.ts"

export const artistRepo   = conn.getRepository(Artist)
export const songRepo     = conn.getRepository(Song)
export const playlistRepo = conn.getRepository(Playlist)