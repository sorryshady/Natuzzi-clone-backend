const httpStatus = require('http-status')
const userService = require('./user.service')
const ApiError = require('../utils/ApiError')

const loginUser = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Account does not exist.')
  } else {
    if (!(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password.')
    }
  }
  return user
}

module.exports = {
  loginUser,
}
