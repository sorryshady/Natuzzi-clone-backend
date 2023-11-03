const express = require('express')
const httpStatus = require('http-status')
const validate = require('../middlewares/validate')
const authValidation = require('../validations/auth.validation')
const authController = require('../controllers/auth.controller')
const router = express.Router()

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
)
router.post('/login', (req, res) => {
  res.send({
    code: httpStatus.OK,
    message: 'received login info',
  })
})

module.exports = router
