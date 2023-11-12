const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const { tokenTypes } = require('../configs/tokens')

const generateToken = (
  userId,
  user,
  userName,
  email,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    user,
    userName,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  }
  return jwt.sign(payload, secret)
}

// const generateAuthTokens = async (user, rememberMe = false) => {
const generateAuthTokens = async (user, rememberMe = false) => {
  const tokenExpirationMinutes = config.jwt.accessExpirationMinutes
  // const tokenExpirationMinutes = rememberMe
  //   ? config.jwt.rememberMeAccessExpirationMinutes
  //   : config.jwt.accessExpirationMinutes

  const tokenExpiry =
    // Math.floor(Date.now() / 1000) + tokenExpirationMinutes * 60
    Math.floor(Date.now() / 1000) + 10
  const userName = user.firstName + ' ' + user.lastName

  const accessToken = generateToken(
    user._id,
    user.accountType,
    userName,
    user.email,
    tokenExpiry,
    tokenTypes.ACCESS
  )

  return {
    token: accessToken,
    expires: new Date(tokenExpiry * 1000),
  }
}

module.exports = {
  generateAuthTokens,
  generateToken,
}
