const mongoose = require('mongoose')

const commonUserPropertiesSchema = mongoose.Schema({
  birthday: {
    type: Date,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  storeOption: {
    natuzziItalia: {
      type: String,
    },
    natuzziEditions: {
      type: String,
    },
  },
})

module.exports = commonUserPropertiesSchema
