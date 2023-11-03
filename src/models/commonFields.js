const validator = require('validator')
const commonFields = {
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
}

module.exports = { commonFields }
