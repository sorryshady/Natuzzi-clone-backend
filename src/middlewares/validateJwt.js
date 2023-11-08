const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const config = require('../configs/config')

const validateJwt = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      code: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized: No token provided.',
    })
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    console.log(decoded)
    next()
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      code: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized: Invalid token.',
    })
  }
}

module.exports = validateJwt
