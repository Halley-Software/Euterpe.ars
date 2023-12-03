import app from "./src/app.js"

app.ready(5000, {
  message: (_, routes) => {
    console.log(`Han sido declaradas ${routes} rutas`)
  }
})