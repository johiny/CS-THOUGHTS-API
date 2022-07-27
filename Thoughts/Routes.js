import express from "express"
import {faker} from "@faker-js/faker"

const router = express.Router()
const fakeArray = [{id: 1, content: "cs50 is the best"},{id: 2, content: "cs50 is trash!"},{id: 3, content: "cs50 was good"}]

router.get("/", (req, res) => {
  const {limit} = req.query || 0
  if (limit){
    let thoughts = []
    for(let i = 0; i < limit; i++)
    {
      thoughts.push({id : faker.random.numeric(), nombre: faker.name.firstName(), content : faker.random.words()})
    }
    res.json(thoughts)
  }
  else{
    res.json("no hay nada ;c")
  }
})

router.get("/:id", (req, res) => {
  const {id} = req.params
  for(const thought of fakeArray)
  {
    if(thought.id == id)
    {
      res.json(thought)
      return
    }
  }
  res.send("no se encontro el thought")
})

router.get("/create_thought", (req, res) => {
  const newThought = {id : faker.random.numeric(), nombre: faker.name.firstName(), content : faker.random.words()}
  res.json(newThought)
})

export default router
