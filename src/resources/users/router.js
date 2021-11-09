import { Router } from 'express'
import { User } from '../'
import {
  extractQueryParams,
  paginatedQuery,
  constructSearchQuery,
} from '../utils'

const router = Router()

router.route('/').post((req, res) => {})

router
  .route('/:id')
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {})

//admin

//create users (initialize) and optionally assign students
router.post('/initialize', async (req, res, next) => {
  const {
    body: { user },
  } = req

  console.log('user', user)

  if (!user.email) {
    return res.status(422).json({
      success: false,
      errors: { email: 'is required' },
    })
  }

  if (!user.role) {
    return res.status(422).json({
      success: false,
      errors: {
        role: 'is required',
      },
    })
  }

  const query = await User.find({ email: user.email })
  if (query.length != 0) {
    return res.status(422).json({
      success: false,
      errors: { email: 'already exists' },
    })
  }

  const finalUser = new User(user)

  return finalUser
    .save()
    .then(() => res.send({ success: 'true', user: finalUser.toAuthJSON() }))
    .catch((e) =>
      res
        .status(422)
        .json({ success: false, errors: e, message: 'error saving user' })
    )
})

//assign students
router.post('/assign', async (req, res, next) => {
  const {
    body: { user, students },
  } = req

  const query = await User.find({ _id: user._id })

  User.updateOne(
    { _id: query[0]._id },
    {
      students: [...students, ...query[0].students],
    }
  )
    .then(() => res.send({ success: true }))
    .catch((e) =>
      res
        .status(422)
        .json({ success: false, errors: e, message: 'error saving user' })
    )
})

//remove students
router.post('/remove', async (req, res, next) => {
  const {
    body: { user, students },
  } = req

  const query = await User.find({ _id: user._id })

  const remainingStudents = query[0].students.filter(
    (student) => !students.includes(student.toString())
  )

  User.updateOne(
    { _id: query[0]._id },
    {
      students: remainingStudents,
    }
  )
    .then(() => res.send({ success: true }))
    .catch((e) =>
      res
        .status(422)
        .json({ success: false, errors: e, message: 'error saving user' })
    )
})

//deactivate users
router.post('/deactivate', async (req, res, next) => {
  const {
    body: { user },
  } = req
  const query = await User.find({ _id: user._id })
  if (query.length == 0) {
    return res.status(422).json({
      success: false,
      errors: { user: 'Does not exist' },
    })
  }
  User.updateOne(
    { _id: query[0]._id },
    {
      isActive: false,
    }
  )
    .then(() => res.send({ success: true }))
    .catch((e) =>
      res
        .status(422)
        .json({ success: false, errors: e, message: 'error saving user' })
    )
})

// get all ambassadors, teachers
router.post('/getAllFromRole', async (req, res, next) => {
  const {
    body: { role },
  } = req

  const { searchTerm, ...options } = extractQueryParams(req)

  const query = searchTerm
    ? constructSearchQuery(
        ['firstName', 'lastName', 'email', 'school'],
        searchTerm
      )
    : {}

  query.role = role

  const projection = {
    role: 1,
    students: 1,
    email: 1,
    firstName: 1,
    lastName: 1,
    languagesSpoken: 1,
    isActive: 1,
    _id: 1,
  }

  const list = await paginatedQuery(res, User, query, projection, options)

  res.send({ success: true, list })
})

router.post('/update', async (req, res, next) => {
  const {
    body: { user },
  } = req
  const query = await User.find({ _id: user._id })
  if (query.length == 0) {
    return res.status(422).json({
      success: false,
      errors: { user: 'Does not exist' },
    })
  }
  User.updateOne(
    { _id: query[0]._id },
    {
      role: user.role,
      students: user.students,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      languagesSpoken: user.languagesSpoken,
      school: user.school,
    }
  )
    .then(() =>
      res.send({ success: true, message: 'User profile successfully saved!' })
    )
    .catch((e) =>
      res.status(422).json({
        success: false,
        errors: e,
        message: 'Error saving user profile',
      })
    )
})

export default router
