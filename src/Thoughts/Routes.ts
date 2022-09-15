import express from "express"
import { PrismaClient } from "@prisma/client"
import coolDownService from "./coolDownService"
import {queryBuilder, queryParams} from "./ownFilterService"
import { validationFactory } from "../Middlewares/dataValidationMiddlewares"
import { thoughtsFilters, getThoughtbyID, createThought, modifyThought } from "./validationSchemas"

const router = express.Router()
const prisma = new PrismaClient()
// const coolDown = new coolDownService()

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
    res.status(201).json({message: "the thought has been created",...newThought})
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

// router.patch("/:id/upVote", async (req, res, next) => {
//   const id = parseInt(req.params.id)
//   const ip = req.ip
//   if(coolDown.verifyCoolDown(ip, id, "positive")){
//     res.status(425).json({message: "you already upvote this thought in less than an hour you can only upvote the same comment hourly"})
//     return
//   }
//   try{
//   const thoughtNewValues = await prisma.thoughts.update({
//     where: {id: id},
//     data: {upVotes : {increment: 1}}
//   })
//   coolDown.addToIpList(ip, id, "positive")
//   res.status(200).json({message: "the upvotes has been updated", ...thoughtNewValues})}
//   catch(err){
//     next(err)
//   }
// })

// router.patch("/:id/downVote", async (req, res, next) => {
//   const id = parseInt(req.params.id)
//   const ip = req.ip
//   if(coolDown.verifyCoolDown(ip, id, "negative")){
//     res.status(425).json({message: "you already upvote this thought in less than an hour you can only upvote the same comment hourly"})
//     return
//   }
//   try{
//   const thoughtNewValues = await prisma.thoughts.update({
//     where: {id: id},
//     data: {DownVotes : {increment: 1}}
//   })
//   coolDown.addToIpList(ip, id, "negative")
//   res.status(200).json({message: "the downvotes has been updated", ...thoughtNewValues})
//   }
//   catch(err){
//     next(err)
//   }
// })
export default router
