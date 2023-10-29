const express = require('express')
const httpStatus = require('http-status')

const router = express.Router()

router.post('/register', (req, res) => {
  res.send({
    code: httpStatus.OK,
    message: 'received register info',
  })
})
router.post('/login', (req, res) => {
  res.send({
    code: httpStatus.OK,
    message: 'received login info',
  })
})

module.exports = router
