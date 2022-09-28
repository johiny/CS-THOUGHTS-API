import express from "express"
import { prisma } from "../index"
import { coolDown } from "../index"
import {queryBuilder, queryParams} from "./ownFilterService"
import { validationFactory } from "../Middlewares/dataValidationMiddlewares"
import { thoughtsFilters, getThoughtbyID, createThought, modifyThought } from "./validationSchemas"

const router = express.Router()

router.get("/", validationFactory("query", thoughtsFilters), async (req, res, next) => {
  const filters = queryBuilder(req.query as queryParams)
  try{
  const thoughts = await prisma.thoughts.findMany(filters)
  res.status(200).json(thoughts)
  return
}
  catch(err){
    next(err)
  }
})

router.get("/:id", validationFactory('params', getThoughtbyID), async (req, res, next) => {
  const id = parseInt(req.params.id)
  try{
  const thought = await prisma.thoughts.findUnique({where :{ id : id}})
    res.status(200).json(thought)
    return
  }
  catch(err){
    next(err)
  }
})

router.post("/", validationFactory('body',  createThought), async (req, res, next) => {
  let newThought = req.body
  try{
    newThought = await prisma.thoughts.create({
      data: newThought})
    res.status(201).json({message: "the thought has been created", newThought: newThought})
    return
  }
  catch(err){
    next(err)
  }
})

router.patch("/:id", validationFactory('params', getThoughtbyID), validationFactory('body', modifyThought), async (req, res, next) => {
  const id = parseInt(req.params.id)
  const newValues = req.body
  try{
    const updateThought = await prisma.thoughts.update({
      where: {id: id},
      data: newValues
    })
      res.status(200).json({message: "The thought has been modified", ...updateThought})
      return
  }
  catch(err){
    next(err)
  }
})

router.delete("/:id", validationFactory('params', getThoughtbyID), async (req, res, next) => {
  const id = parseInt(req.params.id)
  try{
    const thoughtDeleted = await prisma.thoughts.delete({where:{id: id}})
      res.status(200).json({message: "The thought has been deleted", id: thoughtDeleted.id})
      return
  }
  catch(err){
    next(err)
  }
})

router.patch("/:id/upVote", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const isCoolDown = coolDown.verifyCoolDown(ip as string, id, "positive")
  if(isCoolDown != false){
    res.status(425).json({message: `You already like this thought in less than an hour, you can do it again in ${isCoolDown} minutes`})
    return
  }
  try{
  const thoughtNewValues = await prisma.thoughts.update({
    where: {id: id},
    data: {upVotes : {increment: 1}}
  })
  coolDown.addToIpList(ip as string, id, "positive")
  res.status(200).json({message: "Your Like has been saved!", ...thoughtNewValues})}
  catch(err){
    next(err)
  }
})

router.patch("/:id/downVote", async (req, res, next) => {
  const id = parseInt(req.params.id)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const isCoolDown = coolDown.verifyCoolDown(ip as string, id, "negative")
  if(isCoolDown){
    res.status(425).json({message: `You already dislike this thought in less than an hour,  you can do it again in ${isCoolDown} minutes`})
    return
  }
  try{
  const thoughtNewValues = await prisma.thoughts.update({
    where: {id: id},
    data: {DownVotes : {increment: 1}}
  })
  coolDown.addToIpList(ip as string, id, "negative")
  res.status(200).json({message: "Your Dislike has been saved!", ...thoughtNewValues})
  }
  catch(err){
    next(err)
  }
})
export default router
