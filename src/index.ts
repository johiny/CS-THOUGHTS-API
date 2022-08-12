import express from "express"
import dotenv from "dotenv"
import Router from "./Router"
import {jsonError} from "./Middlewares/errorMiddlewares"

// api config
dotenv.config()
const port = process.env.PORT

// api start
const app = express()
app.use(express.json())
app.use(jsonError)
Router(app)

app.listen(port, () => {
  console.log(`Backend funcionando en: http://localhost:${port}`)
})
