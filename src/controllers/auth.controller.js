const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService, tokenService, authService } = require('../services')

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.cookie('jwt', tokens.token, {
    expires: tokens.expires,
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
  return res.status(httpStatus.CREATED).json({ user, tokens })
})

const login = catchAsync(async (req, res) => {
  const { email, password, rememberMe } = req.body
  const user = await authService.loginUser(email, password)
  const tokens = await tokenService.generateAuthTokens(user, rememberMe)
  res.cookie('jwt', tokens.token, {
    expires: tokens.expires,
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
  return res.status(httpStatus.OK).json({ user, tokens, rememberMe })
})

const logout = catchAsync(async (req, res) => {
  return res.status(httpStatus.OK).json({
    code: httpStatus.OK,
    message: 'Logout Successfull',
  })
})

const fetchUser = catchAsync(async (req, res) => {
  return res.status(httpStatus.OK).json(req.user)
})

module.exports = {
  register,
  login,
  logout,
  fetchUser,
}
