import express from "express"
import { PrismaClient } from "@prisma/client"
import { authorizedKeysToChangeOnUpdate, requiredValuesToCreateThought, feelingEnum } from "./thoughtModel"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  const thoughts = await prisma.thought.findMany()
  res.status(200).json(thoughts)
})

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const thought = await prisma.thought.findUnique({where :{ id : id}})
  if(thought){
    res.status(200).json(thought)
  }
  else{
    res.status(404).json({ message : "no se encontro el thought"})
  }
})

router.post("/", async (req, res) => {
  let newThought = req.body
  for(const key in newThought){
    if(!requiredValuesToCreateThought.includes(key)){
      res.status(400).json({ message : "parametros equivocados!"})
      return
    }
  }
  if(!(feelingEnum.includes(newThought.feeling))){
    res.status(418).json({ message : "Trying to break my db?"})
      return
  }
  newThought = await prisma.thought.create({
    data: newThought})
  if(newThought){
    res.status(201).json({message: "the thought has been created",
  ...newThought})
    return
  }
    else{
    res.status(444).json({message: "the thought cannot be created try again"})
  }
})

router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const newValues = req.body

      for(const key in newValues){
        if(!(authorizedKeysToChangeOnUpdate.includes(key))){
          res.status(404).json({message: `you are using incorrect parameters you can only update thought'byUsername, content and feeling fields`})
          return
        }
      }

      if(newValues?.feeling){
        if(!(feelingEnum.includes(newValues.feeling))){
          res.status(418).json({ message : "Trying to break my db?"})
          return
        }
      }

      const updateThought = await prisma.thought.update({
        where: {id: id},
        data: newValues
      })
      if(updateThought){
        res.status(200).json({message: "The thought has been modified", ...updateThought})
        return
      }
      else{
        res.status(404).json({message: "The thought you're trying to edit doesn't exist"})
      }
})

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const thoughtDeleted = await prisma.thought.delete({where:{id: id}})
  if(thoughtDeleted){
    res.status(200).json({message: "The thought has been deleted"})
    return
  }
  else{
    res.status(404).json({message: "The thought you're trying to delete doesn't exist"})
  }
})
export default router
