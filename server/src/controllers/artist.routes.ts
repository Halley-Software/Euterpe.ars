import { HRouter } from "@laniakeajs/halley.http"

import { type ResponseStatus } from "#types/response-typings"
import { ArtistsController } from "../model/artist.model.js"
import { SongsController } from "../model/song.model.js"

const artistRouter = new HRouter("/artists", [])

// Gets all the registered artists
artistRouter.get("/", async (_, res) => {
  ArtistsController.GET.all()
    .then(artists => res.json(artists))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando los artistas" } as ResponseStatus )
    })
})

// Get all songs from the artists `aid` which means (a)rtist(id)
artistRouter.get<["aid"]>("/:aid", async (req, res) => {
  ArtistsController.GET.byID(req.params.aid)
    .then(artist => res.json(artist))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando el artista" } as ResponseStatus )
    })
})

// Saves a new artist into the database
artistRouter.post("/new", async (req, res) => {

  let response: Partial<ResponseStatus>

  try {
    const artist = await ArtistsController.POST.insert(JSON.parse(req.body))
    response = {
      ok: true,
      message: `Nuevo artista ${artist.name} guardado con exito`
    }
  } catch (error) {
    console.error(error)
      response = {
        ok: false,
        message: "Se ha producido un error al intentar guardar el artista"
      }
  } finally {
    res.json(response!) // bypassing error: "used before being assigned" because the statements inside blocks "try" or "catch" will occur in any case
  }
})

export default artistRouter