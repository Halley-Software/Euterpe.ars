import { Halley } from "@laniakeajs/halley.http"
import { cors } from "@tinyhttp/cors"

import artistRouter from "./controllers/artist.routes.ts"
import playListRouter from "./controllers/playlist.routes.ts"
import songRouter from "./controllers/song.routes.ts"

const app = new Halley({ useNodeEnv: true })

app.register(Halley.rawBodyParser())
app.register(cors({ origin: "*" }))

app.use(artistRouter)
app.use(playListRouter)
app.use(songRouter)

export default app