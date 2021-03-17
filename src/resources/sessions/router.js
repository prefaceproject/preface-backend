import { Router } from 'express'

import { Session } from '../'

const router = Router()

router
  .route('/')
  .get(async (_req, res) => {
    try {
      const sessions = await Session.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'book',
          },
        },
        {
          $unwind: {
            path: '$book',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]).sort({ date: -1 })
      res.status(200).json({ data: sessions })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
  .post(async (req, res) => {
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
  .get(async (req, res) => {
    try {
      const session = await Session.findById({ _id: req.params.id })
        .sort({ date: -1 })
        .lean()
        .exec()

      session ? res.status(200).json({ data: session }) : res.status(404).end()
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
  .put(async (req, res) => {
    try {
      const updatedSession = await Session.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
        .lean()
        .exec()

      updatedSession
        ? res.status(200).json({ data: updatedSession })
        : res.status(404).end()
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedSession = await Session.findOneAndDelete({
        _id: req.params.id,
      })

      deletedSession
        ? res.status(200).json({ data: deletedSession })
        : res.status(400).end()
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })

// get sessions based off of studentid, sorted by date
router.post('/getAllByStudent', async (req, res, next) => {
  const {
    studentId: { student },
  } = req

  console.log('res', student)

  const list = await Session.find({ studentId: student })
  if (list.length == 0) {
    return res.status(422).json({
      success: false,
      errors: { student: 'does not exist' },
    })
  }

  res.send({ success: true, list: list })
})

router.get('/checkStudent', async (req, resp, next) => {
  console.log('checking')
})

export default router
