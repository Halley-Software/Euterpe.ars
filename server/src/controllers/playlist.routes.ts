import { createRouter } from "@laniakeajs/halley.http"

import { type ResponseStatus } from "#types/response-typings"
import { PlaylistsController } from "../model/playlist.model.js"

const playlistRouter = createRouter("/playlists")

// Gets all the registered playlists
playlistRouter.get("/", async (_, res) => {
  PlaylistsController.GET.all()
    .then(playlists => res.json(playlists))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando las listas de reproduccion" } as ResponseStatus )
    })
})

// Gets all the songs in the requested playlist
playlistRouter.get<["pid"]>("/:pid", async (req, res) => {
  PlaylistsController.GET.byID(req.params.pid)
    .then(playlist => res.json(playlist))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando la lista de reproduccion" } as ResponseStatus )
    })
})

// Adds a new playlist
playlistRouter.post("/new", async (req, res) => {

  let response: Partial<ResponseStatus>
  
  try {
    const playlist = await PlaylistsController.POST.insert(JSON.parse(req.body))
    response = {
      ok: true,
      message: `Nueva playlist ${playlist.name} guardada con exito`
    }
  } catch (error) {
    console.error(error)
      response = {
        ok: false,
        message: "Se ha producido un error al intentar guardar la playlist"
      }
  } finally {
    res.json(response!) // bypassing error: "used before being assigned" because the condition "try" or "catch" will occur in any case
  }
})

// Inserts a new song into the parametized playlist
playlistRouter.put("/:pname/new", async (req, res) => {
})

// Deletes a new song from the parametize playlist
playlistRouter.delete("/:pname/drop", async (req, res) => {

})

export default playlistRouter