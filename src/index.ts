import express from "express"
import dotenv from "dotenv"
import Router from "./Router"

// enviroment variables config
dotenv.config()
const port = process.env.PORT

// api config
const app = express()
app.use(express.json())
Router(app)

app.listen(port, () => {
  console.log(`Backend funcionando en: http://localhost:${port}`)
})

