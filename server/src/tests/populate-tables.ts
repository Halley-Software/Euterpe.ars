import { playlistRepo, songRepo, artistRepo } from "../db/data-sources.js"
import { Song } from "../db/models/song.js"
import { Artist } from "../db/models/artist.js"
import { Playlist } from "../db/models/playlist.js"
import { conn } from "../db/connection.js"
import { In } from "typeorm"

async function createPlaylists() {

    const playlistDefault = new Playlist()

    playlistDefault.name = "default"
    playlistDefault.size = 0

    await playlistRepo.save(playlistDefault)
    
    const playlistAntisemita = new Playlist()

    playlistAntisemita.name = "antisemita_typeshit"
    playlistAntisemita.size = 0

    await playlistRepo.save(playlistAntisemita)
    
    const playlistAntiniggers = new Playlist()

    playlistAntiniggers.name = "anti_niggers"
    playlistAntiniggers.size = 0

    await playlistRepo.save(playlistAntiniggers)
}

async function createArtists() {

    const defaultArtist = new Artist()

    defaultArtist.name = "default"
    defaultArtist.size = 0

    await artistRepo.save(defaultArtist)


    const ei = new Artist()

    ei.name = "Estirpe Imperial"
    ei.size = 0

    await artistRepo.save(ei)
}

async function createSongs() {
    const test = new Song()

    playlistRepo.findBy({ name: "antisemita_typeshit" })
    .then(pl => {
        artistRepo.findBy({ name: "default" })
        .then(ar => {
            test.name = "test"
            test.duration = 212
            test.url = "https://youtube.com/watch?v=1234"
            test.playlist = pl
            test.artist = ar

            songRepo.save(test)
        })
    })
}

function main() {
    conn
        .initialize()
        .then(async () => {

            const artistsNames = ["Estirpe Imperial"]

            console.log(await artistRepo.findBy({ name: In(artistsNames) }))

            /* await createPlaylists()

            await createArtists()
        
            await createSongs() */
        })
}

main()