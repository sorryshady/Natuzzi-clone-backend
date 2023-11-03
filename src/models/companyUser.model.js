const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcrypt')
const commonFields = require('./commonFields')

const companyUserSchema = mongoose.Schema({
  ...commonFields,
  company: {
    type: String,
    required: true,
    unique: true,
  },
  VAT: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
})

companyUserSchema.statics.isEmailTaken = async function (email) {
  const count = await this.countDocuments({ email })
  return count > 0
}

companyUserSchema.methods.isPasswordMatch = async function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

companyUserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

const CompanyUser = mongoose.model('CompanyUser', companyUserSchema)
module.exports = { CompanyUser }
