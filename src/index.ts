import express from "express"
import dotenv from "dotenv"
import Router from "./Router"
import {RequestError} from "./Interfaces"

dotenv.config()
const port = process.env.PORT
// api config
const app = express()
app.use(express.json())
app.use((err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if(err instanceof SyntaxError && err.status === 400 && 'body' in err ){
    return res.status(400).send({ status: 404, message: err.message });
  }
})
Router(app)

app.listen(port, () => {
  console.log(`Backend funcionando en: http://localhost:${port}`)
})
