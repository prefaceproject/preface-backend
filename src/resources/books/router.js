import { Router } from 'express'

import { Book } from '../'

const router = Router()

router
  .route('/')
  .get(async (req, res) => {
    const books = await Book.find({})

    res.json({ data: books })
  })
  .post(async (req, res) => {
    try {
      const { body } = req
      const book = await Book.create(body)

      book ? res.status(200).json(book) : res.status(422).end()
    } catch (err) {
      res.status(500).send(err)
    }
  })

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const {
        params: { id },
      } = req

      const book = await Book.findById(id)

      book ? res.status(200).json({ data: book }) : res.status(404).end()
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .put(async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req
      await Book.updateOne({ _id: id }, body)

      res.status(200).json({ data: 'Success' })
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        params: { id },
      } = req
      await Book.deleteOne({ _id: id })

      res.status(200).json({ data: 'Success' })
    } catch (err) {
      res.status(500).send(err)
    }
  })

export default router
