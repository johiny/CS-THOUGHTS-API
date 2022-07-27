import thougthsRoutes from "./Thoughts/Routes.js"

const Router = (app) => {

  app.use("/thoughts", thougthsRoutes)
  app.get("/", (req, res) => {
    res.send("ha nacido!, El supremo backend ha llegado!")
  })
}

export default Router
