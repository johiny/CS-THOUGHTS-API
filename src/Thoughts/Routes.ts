import express from "express"
import { PrismaClient } from "@prisma/client"
import { authorizedKeysToChangeOnUpdate, requiredValuesToCreateThought, feelingEnum} from "./thoughtModel"
import coolDownService from "./coolDownService"
import {queryParamsSanitizer, queryParams} from "./filterService"

const router = express.Router()
const prisma = new PrismaClient()
const coolDown = new coolDownService()

router.get("/", async (req, res) => {
  const Filters = queryParamsSanitizer(req.query as queryParams)
  if(!Filters){
    res.status(400).json({message: "incorrect query params to run a supported filter"})
    return
  }
  const thoughts = await prisma.thoughts.findMany({
    where: Filters.where,
    orderBy : Filters.orderBy
  })
  res.status(200).json(thoughts)
})

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const thought = await prisma.thoughts.findUnique({where :{ id : id}})
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
  newThought = await prisma.thoughts.create({
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

      const updateThought = await prisma.thoughts.update({
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
  const thoughtDeleted = await prisma.thoughts.delete({where:{id: id}})
  if(thoughtDeleted){
    res.status(200).json({message: "The thought has been deleted"})
    return
  }
  else{
    res.status(404).json({message: "The thought you're trying to delete doesn't exist"})
  }
})

router.patch("/:id/upVote", async (req, res) => {
  const id = parseInt(req.params.id)
  const ip = req.ip
  if(coolDown.verifyCoolDown(ip, id, "positive")){
    res.status(425).json({message: "you already upvote this thought in less than an hour you can only upvote the same comment hourly"})
    return
  }
  try{
  const thoughtNewValues = await prisma.thoughts.update({
    where: {id: id},
    data: {upVotes : {increment: 1}}
  })
  coolDown.addToIpList(ip, id, "positive")
  res.status(200).json({message: "the upvotes has been updated", ...thoughtNewValues})}
  catch(err){
    res.status(404).json({message:"thought not found or other error"})
  }
})

router.patch("/:id/downVote", async (req, res) => {
  const id = parseInt(req.params.id)
  const ip = req.ip
  if(coolDown.verifyCoolDown(ip, id, "negative")){
    res.status(425).json({message: "you already upvote this thought in less than an hour you can only upvote the same comment hourly"})
    return
  }
  try{
  const thoughtNewValues = await prisma.thoughts.update({
    where: {id: id},
    data: {DownVotes : {increment: 1}}
  })
  coolDown.addToIpList(ip, id, "negative")
  res.status(200).json({message: "the downvotes has been updated", ...thoughtNewValues})
  }
  catch(err){
    res.status(404).json({message:"thought not found or other error"})
  }
})
export default router
