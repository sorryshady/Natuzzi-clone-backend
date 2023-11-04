const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService } = require('../services')

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  return res.status(httpStatus.CREATED).json({ user })

})

module.exports = {
  register,
}
