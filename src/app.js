const express = require('express')
const compression = require('compression')
const httpStatus = require('http-status')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes/v1')

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.options('*', cors())

app.use('/v1', routes)

app.use((req, res) => {
  res.send({
    code: httpStatus.NOT_FOUND,
    message: 'Resource not found',
  })
})

module.exports = app
