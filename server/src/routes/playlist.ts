import { HRouter } from "@laniakeajs/halley.http"
import data from "../data.js"

const playlistRouter = new HRouter("/:pname", [])

playlistRouter.get<["pname", "name"]>("/:name", (req, res) => {
  res.send(data.getFirst.info.name)
})

export default playlistRouter