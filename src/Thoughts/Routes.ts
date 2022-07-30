import express from "express"
import _ from 'lodash'
const router = express.Router()
let thoughtsArray = [{id: 1, name: "pancarsio", content: "cs50 is the best"},{id: 2, name: "calamardo", content: "cs50 is trash!"},{id: 3, name: "toronja", content: "cs50 was good"}]

router.get("/", (req, res) => {
  res.status(200).json(thoughtsArray)
})

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  for(const thought of thoughtsArray)
  {
    if(thought.id === id)
    {
      res.status(200).json(thought)
      return
    }
  }
  res.status(404).json({ message : "no se encontro el thought"})
})

router.post("/", (req, res) => {
  const newThought = req.body
  const rules = ["name", "content"]
  for(const key in newThought){
    if(!rules.includes(key)){
      res.status(400).json({ message : "parametros equivocados!"})
      return
    }
  }
  const lastThoughtId = thoughtsArray?.at(-1)?.id || 0
  thoughtsArray.push({ id : lastThoughtId + 1 , ...newThought})
  res.status(201).json({message: "the thought has been created",
...newThought})
})

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const newValues = req.body
  const thoughtIndex = thoughtsArray.findIndex((thought) => thought.id === id)

  if(thoughtIndex > -1){
      for(const key of Object.keys(newValues)){
        thoughtsArray[thoughtIndex][key] = newValues[key]
      }
      res.status(200).json({message: "The thought has been modified", newValues: thoughtsArray[thoughtIndex]})
      return
    }

  res.status(404).json({message: "The thought you're trying to edit doesn't exist"})
})

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  let thoughtDeleted = {}
  thoughtsArray = thoughtsArray.filter((thought) => {
    if(thought.id === id){
      thoughtDeleted = thought
      return false
    }
    return true
  })
  if(!_.isEmpty(thoughtDeleted)){
    res.status(200).json({message: "The thought has been deleted"})
    return
  }
  else{
    res.status(404).json({message: "The thought you're trying to delete doesn't exist"})
  }
})
export default router
