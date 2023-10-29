const express = require('express')
const httpStatus = require('http-status')

const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    code: httpStatus.OK,
    message: 'succesfull load',
  })
})

module.exports = router
