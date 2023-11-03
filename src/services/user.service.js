const { PrivateUser, CompanyUser } = require('../models')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')

const createUser = async (userBody) => {
  const accountType = userBody.accountType
  const email = userBody.data.email
  const newData = { accountType, ...userBody.data }
  if (accountType === 'private') {
    if (await PrivateUser.isEmailTaken(email)) {
      throw new ApiError(httpStatus.OK, 'Email already taken')
    }
    console.log(newData)
    // const user = await PrivateUser.create(newData)
    // return user
  } else {
    if (await CompanyUser.isEmailTaken(email)) {
      throw new ApiError(httpStatus.OK, 'Email already taken')
    }
    console.log(newData)
    // const user = await CompanyUser.create(newData)
    // return user
  }
}

module.exports = {
  createUser,
}
