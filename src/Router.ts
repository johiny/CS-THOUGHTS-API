import thougthsRoutes from "./Thoughts/Routes"
import express from "express"
import { Express } from "express-serve-static-core"

const Router = (app: Express) => {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/thoughts", thougthsRoutes)
  app.get("/", (req, res) => {
    res.send("hello! I'm CS50-Thoughts API make me a query!")
  })
  app.get("/status", (req, res) => {
    res.status(200).json({message: 'everything okay!'})
  })
}

export default Router
