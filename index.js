import express from "express"
import dotenv from "dotenv"
import Router from "./Router.js"

dotenv.config()
const app = express()
const port = process.env.PORT
Router(app)

app.listen(port, () => {
  console.log(`Backend funcionando en: http://localhost:${port}`)
})

