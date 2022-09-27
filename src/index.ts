import express from "express"
import dotenv from "dotenv"
import Router from "./Router"
import {jsonError, errorCatcher} from "./Middlewares/errorMiddlewares"
import coolDownService from "./Thoughts/coolDownService"
import { PrismaClient } from "@prisma/client"
const cors = require('cors')

// api config
dotenv.config()
const port = process.env.PORT

// api start
export const coolDown = new coolDownService()
export const prisma = new PrismaClient()
const app = express()
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
}))
app.use(express.json())
app.use(jsonError)
Router(app)
app.use(errorCatcher)

app.listen(port)
