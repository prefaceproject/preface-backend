import { Router } from 'express'
import { Book } from '../'

const router = Router()

router.route('/').get(async (req, res) => {
  const books = await Book.find({})

  res.json(books)
})

router
  .route('/:id')
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {})

export default router
