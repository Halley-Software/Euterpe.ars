import app from "./src/app.js"
import { conn } from "./src/db/connection.js"

const PORT = 5000

/**
 * |------------------------------------------------|
 * |   ARTIST                         PLAYLISTS     |
 * |     |                                |         |
 * |     |                                |         |
 * | SONG_ARTISTS ----- SONGS ----- SONG_PLAYLISTS  |
 * |------------------------------------------------|
 */

async function main(port) {
  if (typeof port !== "number")
    throw new TypeError("Parameter 'port' must be a number")

  conn
    .initialize()
    .then(() => {
      app.ready(port, {
        message: (_, routes) => 
          console.log(`Han sido declaradas ${routes} rutas\nEscuchando en el puerto ${port}`)
      })
    })
    .catch(err => console.error(err))
}

await main(PORT)