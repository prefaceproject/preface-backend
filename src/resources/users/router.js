import { Router } from 'express'
import { User } from '../'

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

  // console.log("res", role)

  const list = await User.find({ role: role })

  const filteredList = list.map((user) => {
    return {
      role: user.role,
      students: user.students,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      languagesSpoken: user.languagesSpoken,
      isActive: user.isActive,
      _id: user._id,
    }
  })

  res.send({ success: true, list: filteredList })
})

router.post('/update', async (req, res, next) => {
  const {
    body: { user },
  } = req
  console.log("in update backend")
  const query = await User.find({ _id: user._id })
  if (query.length == 0) {
    return res.status(422).json({
      success: false,
      errors: { user: 'Does not exist' },
    })
  }
  User.updateOne({_id: query[0]._id}, {
    role: user.role,
    students: user.students,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    languagesSpoken: user.languagesSpoken,
    school: user.school
  })
  .then(() => res.send({ success: true, message: 'User profile successfully saved!' }))
  .catch((e) => res.status(422).json({ success: false, errors: e, message: 'Error saving user profile' }))


})

export default router
