import { DataSource } from "typeorm"
import { Playlist } from "./models/playlist"
import { Song } from "./models/song"
import { Artist } from "./models/artist"
import { User } from "./models/user"

export const conn = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root_ars",
    database: "DB_ARS",
    entities: [Artist, Playlist, Song, User],
    synchronize: true,
    logging: false
})

export const manager = conn.manager