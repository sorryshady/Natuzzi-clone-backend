const express = require('express')
const validate = require('../middlewares/validate')
const authValidation = require('../validations/auth.validation')
const authController = require('../controllers/auth.controller')
const validateJwt = require('../middlewares/validateJwt')
const router = express.Router()

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
)
// router.post('/login', validate(authValidation.login), (req, res) => {
//   res.send('trying to login')
// })
router.post('/login', validate(authValidation.login), authController.login)
// router.get('/logout', validateJwt, (req, res) => {
//   return res.status(200).send('Succesfull logout')
// })
router.get('/logout', (req, res) => {
  return res.status(200).send(req.cookies.jwt)
})

module.exports = router
