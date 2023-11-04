const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('./config')
const { tokenTypes } = require('./tokens')
const { PrivateUser, CompanyUser } = require('../models')

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type')
    }

    if (payload.user === 'private') {
      const privateUser = await PrivateUser.findById(payload.sub)
      if (privateUser) {
        return done(null, privateUser)
      }
    } else if (payload.user === 'company') {
      const companyUser = await CompanyUser.findById(payload.sub)
      if (companyUser) {
        return done(null, companyUser)
      }
    }
    return done(null, false)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = { jwtStrategy }
