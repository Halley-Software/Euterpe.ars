import { createRouter } from "@laniakeajs/halley.http"

import { type ResponseStatus } from "#types/response-typings"
import { SongsController } from "../model/song.model.js"
import { PlaylistsController } from "../model/playlist.model.js"

const songRouter = createRouter("/songs")

// gets all the songs
songRouter.get("/", async (_, res) => {
  SongsController.GET.all()
    .then(songs => res.json(songs))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando las canciones" } as ResponseStatus )
    })
})

// gets all the songs from a playlist
songRouter.get<["pid"]>("/from/playlist/:pid", (req, res) => {
  SongsController.GET.allFromPlaylist(req.params.pid)
    .then(songs => res.json(songs))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando las canciones" } as ResponseStatus )
    })
})

// gets all the songs from an artist
songRouter.get<["aid"]>("/from/artist/:aid", (req, res) => {
  SongsController.GET.allFromArtist(req.params.aid)
    .then(songs => res.json(songs))
    .catch(err => {
      console.error(err)
      res.json( { ok: false, message: "Error buscando las canciones" } as ResponseStatus )
    })
})

songRouter.post<["pid"]>("/insert/:pid", (req, res) => {
  PlaylistsController.POST.insertInto({ id: req.params.pid })
  // TODO: COMPLETE THIS ROUTE
})

// Saves a new song into the database
songRouter.post("/new", async (req, res) => {
  let response: Partial<ResponseStatus>

  const body: {
    name: string,
    url: string,
    duration: number,
    playlist: string,
    artist: string
  } = JSON.parse(req.body)

  try {
    const song = await SongsController.POST.insert({
      name: body.name,
      url: body.url,
      duration: body.duration,
      playlist: JSON.parse(body.playlist),
      artist: JSON.parse(body.artist)
    })
    response = {
      ok: true,
      message: `Nueva cancion ${song.name} guardada con exito`
    }
  } catch (error) {
    console.error(error)
      response = {
        ok: false,
        message: "Se ha producido un error al intentar guardar la cancion"
      }
  } finally {
    res.json(response!) // safety non-null assert because the condition "try" or "catch" will occur in any case
  }
})

export default songRouter