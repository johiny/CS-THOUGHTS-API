import thougthsRoutes from "./Thoughts/Routes"
import express from "express"
import { Express } from "express-serve-static-core"

const Router = (app: Express) => {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/thoughts", thougthsRoutes)
  app.get("/", (req, res) => {
    res.send("ha nacido!, El supremo backend ha llegado!")
  })
}

export default Router
