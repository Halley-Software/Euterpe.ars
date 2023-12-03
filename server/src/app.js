import { Halley } from "@laniakeajs/halley.http"

import playListRouter from "./routes/playlist"

const app = new Halley()

app.use(playListRouter)

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

export default app