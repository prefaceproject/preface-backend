import { Router } from 'express'
import { Types } from 'mongoose'
import { Student, Session, User } from '../'

const router = Router()

router
  .route('/')
  .get(async (req, res) => {
    try {
      const query = await User.findOne({ _id: req.query._id })
      if (query.length == 0) {
        return res.status(422).json({
          success: false,
          errors: { user: 'Does not exist' },
        })
      }

      if (query.role == 'admin') {
        const students = await Student.find({}).lean().exec()

        if (!students) {
          res.status(404).end()
        }

        res.status(200).json(students)
      } else {
        const students = await Student.find({ _id: { $in: query.students } })
          .lean()
          .exec()

        if (!students) {
          res.status(404).end()
        }

        res.status(200).json(students)
      }
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      const student = await Student.create({ ...req.body })
      if (!student) {
        res.status(404).end()
      }
      res.status(200).json({ data: student })
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const student = await Student.findOne({ _id: req.params.id })
        .lean()
        .exec()

      if (!student) {
        res.status(404).end()
      }

      res.status(200).json({ data: student })
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })
  .put(async (req, res) => {
    try {
      const updatedStudent = await Student.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
        .lean()
        .exec()

      if (!updatedStudent) {
        res.status(404).end()
      }

      res.status(200).json({ data: updatedStudent })
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const removed = await Student.remove(
        { _id: req.params.id },
        { justOne: true }
      )

      if (!removed) {
        res.status(404).end()
      }

      res.status(200).json({ data: removed })
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })

router.route('/:id/sessions').get(async (req, res) => {
  const studentId = Types.ObjectId(req.params.id)

  try {
    const students = await Session.aggregate([
      { $match: { studentId } },
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
    ])
    res.status(200).send({ data: students })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router
