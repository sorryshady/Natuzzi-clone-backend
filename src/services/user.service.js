const { PrivateUser, CompanyUser } = require('../models')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')

const createUser = async (userBody) => {
  const accountType = userBody.accountType
  const email = userBody.data.email
  const newData = { accountType, ...userBody.data }
  if (
    (await PrivateUser.isEmailTaken(email)) ||
    (await CompanyUser.isEmailTaken(email))
  ) {
    throw new ApiError(httpStatus.OK, 'Email already taken')
  }
  if (accountType === 'private') {
    // console.log(newData)
    try {
      const user = await PrivateUser.create(newData)
    } catch (error) {
      console.error(error)
    }
    // return user
  } else {
    console.log(newData)
    // const user = await CompanyUser.create(newData)
    // return user
  }
}

module.exports = {
  createUser,
}
