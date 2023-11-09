const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService, tokenService, authService } = require('../services')

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.cookie('jwt', tokens.access.token, {
    expires: tokens.access.expires,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })
  // res.cookie('loggedIn', true, {
  //   expires: tokens.access.expires,
  //   sameSite: 'None',
  //   secure: true,
  // })
  // return res.status(httpStatus.CREATED).json({ user, tokens })
  return res.status(httpStatus.CREATED).json({ user })
})

const login = catchAsync(async (req, res) => {
  const { email, password, rememberMe } = req.body
  const user = await authService.loginUser(email, password)
  const tokens = await tokenService.generateAuthTokens(user, rememberMe)
  res.cookie('jwt', tokens.access.token, {
    expires: tokens.access.expires,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })
  // res.cookie('loggedIn', true, {
  //   expires: tokens.access.expires,
  //   sameSite: 'None',
  //   secure: true,
  // })
  // return res.status(httpStatus.OK).json({ user, tokens })
  return res.status(httpStatus.OK).json({ user })
})

const logout = catchAsync(async (req, res) => {
  res.clearCookie('jwt')
  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Logout Successfull',
  })
})

module.exports = {
  register,
  login,
  logout,
}
