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
router.get('/user', validateJwt, authController.fetchUser)
router.post('/login', validate(authValidation.login), authController.login)
router.get('/logout', validateJwt, authController.logout)

module.exports = router
