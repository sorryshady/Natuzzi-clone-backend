const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const config = require('../configs/config')
const { PrivateUser } = require('../models/index')
const { CompanyUser } = require('../models/index')

const validateJwt = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization
  // console.log(token)

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      code: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized: No token provided.',
    })
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    const userType = decoded.user
    const userId = decoded.sub
    let user
    if (userType === 'private') {
      user = await PrivateUser.findById(userId)
    } else {
      user = await CompanyUser.findById(userId)
    }
    if (user) {
      req.user = user
      next()
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        code: httpStatus.UNAUTHORIZED,
        message: 'Unauthorized: Invalid user token',
      })
    }
  } catch (error) {
    // console.log(error.message)
    if (error.message === 'jwt expired') {
      return res.status(httpStatus.UNAUTHORIZED).json({
        code: httpStatus.UNAUTHORIZED,
        message: 'token has expired',
      })
    }
    if (error.message === 'invalid token') {
      return res.status(httpStatus.UNAUTHORIZED).json({
        code: httpStatus.UNAUTHORIZED,
        message: 'invalid token',
      })
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error.',
    })
  }
}

module.exports = validateJwt
