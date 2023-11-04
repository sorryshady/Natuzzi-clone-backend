const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService } = require('../services')

const register = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    return res.status(httpStatus.CREATED).json({ user })
  } catch (error) {
    console.log(error)
  }
  // return res.send({
  //   code: httpStatus.OK,
  //   data: req.body,
  // })
})

module.exports = {
  register,
}
