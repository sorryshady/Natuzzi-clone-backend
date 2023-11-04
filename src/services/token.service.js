const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const { tokenTypes } = require('../configs/tokens')

const generateToken = (
  userId,
  user,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    user,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  }
  return jwt.sign(payload, secret)
}

const generateAuthTokens = async (user) => {
  const tokenExpiry =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60
  const accessToken = generateToken(
    user._id,
    user.accountType,
    tokenExpiry,
    tokenTypes.ACCESS
  )
  return {
    access: {
      token: accessToken,
      expires: new Date(tokenExpiry * 1000),
    },
  }
}

module.exports = {
  generateAuthTokens,
  generateToken,
}
