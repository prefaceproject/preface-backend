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

  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      success: false,
      errors: { email: 'is required',},
    });
  }

  if(!user.role) {
    return res.status(422).json({
      success: false,
      errors: {
        role: 'is required',
      },
    });
  }

  const query = await User.find({email: user.email});
  if (query.length != 0){
    return res.status(422).json({
      success: false,
      errors: { email: 'already exists',},
    });
  }

  const finalUser = new User(user);

  return finalUser.save()
    .then(() => res.send({ success: true, user: finalUser.toAuthJSON() }))
    .catch((e) => res.status(422).json({ success: false, errors: e, message: 'error saving user' }))
});


//assign students
router.post('/assign', async (req, res, next) => {

  const { body: { user, students } } = req;

  const query = await User.find({_id: user._id});
  User.updateOne({_id: query[0]._id}, {
    students: [...students, ...query[0].students]
  })
});


//remove students

//deactivate users


export default router