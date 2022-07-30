import thougthsRoutes from "./Thoughts/Routes"
import express from "express"

const Router = (app) => {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/thoughts", thougthsRoutes)
  app.get("/", (req, res) => {
    res.send("ha nacido!, El supremo backend ha llegado!")
  })
}

export default Router
