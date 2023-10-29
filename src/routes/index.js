const express = require('express')
const authRoutes = require('./auth.routes')
const regularRoutes = require('./regular.routes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/', regularRoutes)

module.exports = router
