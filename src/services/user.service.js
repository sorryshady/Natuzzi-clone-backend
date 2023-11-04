const { PrivateUser, CompanyUser } = require('../models')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcrypt')

const createUser = async (userBody) => {
  const accountType = userBody.accountType
  const offers = userBody.offers
  const email = userBody.data.email
  const newData = { accountType, offers, ...userBody.data }
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

const getUserByEmail = async (email) => {
  const privateUser = await PrivateUser.findOne({ email })
  if (privateUser) {
    return privateUser
  }
  return CompanyUser.findOne({ email })
}

module.exports = {
  createUser,
  getUserByEmail,
}
