const express = require('express')
const httpStatus = require('http-status')

const router = express.Router()

router.use('/', (req, res) => {
  res.send({
    code: httpStatus.OK,
    message: 'Reaching index.js in routes',
  })
})

module.exports = router
