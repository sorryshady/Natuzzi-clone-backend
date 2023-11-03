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
    const user = await PrivateUser.create(newData)
    return user
  } else {
    try {
      const user = await CompanyUser.create(newData)
      return user
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = {
  createUser,
}
