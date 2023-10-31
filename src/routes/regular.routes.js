const express = require('express')
const httpStatus = require('http-status')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'succesfull load',
  })
})

module.exports = router
