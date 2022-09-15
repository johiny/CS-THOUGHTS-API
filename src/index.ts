import express from "express"
import dotenv from "dotenv"
import Router from "./Router"
import {jsonError, errorCatcher} from "./Middlewares/errorMiddlewares"

// api config
dotenv.config()
const port = process.env.PORT

// api start
const app = express()
app.use(express.json())
app.use(jsonError)
Router(app)
app.use(errorCatcher)

app.listen(port)
