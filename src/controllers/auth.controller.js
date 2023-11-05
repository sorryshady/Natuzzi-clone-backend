const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService, tokenService, authService } = require('../services')

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  return res
    .status(httpStatus.CREATED)
    .cookie('jwt', tokens.access.token, {
      expires: tokens.access.expires,
      httpOnly: true,
    })
    .json({ user })
})

const login = catchAsync(async (req, res) => {
  const { email, password, rememberMe } = req.body
  const user = await authService.loginUser(email, password)
  const tokens = await tokenService.generateAuthTokens(user, rememberMe)
  return res
    .status(httpStatus.OK)
    .cookie('jwt', tokens.access.token, {
      expires: tokens.access.expires,
      httpOnly: true,
    })
    .json({ user })
})

module.exports = {
  register,
  login,
}
