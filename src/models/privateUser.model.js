const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const privateUserSchema = mongoose.Schema(
  {
    accountType: {
      type: String,
      required: true,
      enum: ['private', 'company'],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate(value) {
        if (
          !value.match(/\d/) ||
          !value.match(/[A-Z]/) ||
          !value.match(/[@$!%*?&]/)
        ) {
          throw new Error(
            'Password must contain at least one uppercase letter, one number, and one special character'
          )
        }
      },
    },
    offers: {
      type: Boolean,
      required: false, // Not required
    },
  },
  { timestamps: true }
)

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
