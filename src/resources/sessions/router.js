import { Router } from 'express'
import { Session } from '../'

const router = Router()

router
  .route('/')
  .get( async (req, res) => {
    try {
      const sessions = await Session.find({})

      res.status(200).json({ data: sessions })
    } catch (e) {
      console.error(e)
      res.status(400).end() 
    }
  })
  .post( async (req, res) => {
    try {
      const { body } = req
      const session = await Session.create(body)
      res.status(201).json({ data: session })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })

router
  .route('/:id')
  .get( async (req, res) => {
    try {
      const session = await Session
      .findById({ _id: req.params.id })
      .lean()
      .exec()
      
      session ? res.status(200).json({ data: session}) : res.status(404).end()

    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
  .put( async (req, res) => {
    try {
      const updatedSession = await Session
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

      updatedSession ? res.status(200).json({ data: updatedSession }) : res.status(404).end()
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
  .delete( async (req, res) => {
    try {
      const deletedSession = await Session.findOneAndRemove({
        _id: req.params.id
      })

     deletedSession ? res.status(200).json({ data: deletedSession }) : res.status(400).end()
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
export default router
