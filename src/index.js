import express from 'express'
import bodyParser from 'body-parser'

import crud from './utils/crud'
import usersRouter from './resources/users/router.js'
import booksRouter from './resources/books/router.js'
import sessionsRouter from './resources/sessions/router.js'
import studentsRouter from './resources/students/router.js'
import authRouter from './auth/router.js'
import { connectDb } from './resources'

const cors = require('cors');


import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.use('/api/users', usersRouter)
app.use('/api/books', booksRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/students', studentsRouter)
app.use('/api/auth', authRouter)

app.get('/test', (req, res) => {
  res.send({ express: 'Test call to backend' })
})

app.get('/example_saga_request', (req, res) => {
  res.send({ message: 'Saga success ' })
})

connectDb().then(async () => {
  app.listen(port, () => console.log(`Listening on port ${port}`))
})
