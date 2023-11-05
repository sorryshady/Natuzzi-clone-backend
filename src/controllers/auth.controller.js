const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService, tokenService, authService } = require('../services')

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  const cookieOptions = {
    expires: tokens.access.expires,
    // secure: true,
    httpOnly: true,
  }
  res.cookie('jwt', tokens.access.token, cookieOptions)
  return res.status(httpStatus.CREATED).json({ user })
})

const login = catchAsync(async (req, res) => {
  const { email, password, rememberMe } = req.body
  const user = await authService.loginUser(email, password)
  const tokens = await tokenService.generateAuthTokens(user, rememberMe)
  const cookieOptions = {
    expires: tokens.access.expires,
    // secure: true,
    httpOnly: true,
  }
  res.cookie('jwt', tokens.access.token, cookieOptions)
  return res.status(httpStatus.OK).send({ user })
})

module.exports = {
  register,
  login,
}
