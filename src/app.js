const express = require('express')
const compression = require('compression')
const httpStatus = require('http-status')
const cors = require('cors')
const helmet = require('helmet')
const { errorHandler } = require('./middlewares/errorHandler')
const ApiError = require('./utils/ApiError')
const routes = require('./routes/index')
const passport = require('passport')
const { jwtStrategy } = require('./configs/passport')
const cookieParser = require('cookie-parser')

const app = express()

app.use(helmet())

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(compression())

const corsConfig = {
  origin: true,
  credentials: true,
}

app.use(cors(corsConfig))
app.options('*', cors(corsConfig))


app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use('/v1', routes)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})
app.use(errorHandler)

module.exports = app
