const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const commonFields = require('./commonFields')

const privateUserSchema = mongoose.Schema({
  ...commonFields,
})

privateUserSchema.statics.isEmailTaken = async function (email) {
  const count = await this.countDocuments({ email })
  return count > 0
}
privateUserSchema.methods.isPasswordMatch = async function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}
privateUserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

const PrivateUser = mongoose.model('PrivateUser', privateUserSchema)
module.exports = { PrivateUser }
