const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters')
  }
  if (
    !value.match(/\d/) ||
    !value.match(/[A-Z]/) ||
    !value.match(/[@$!%*?&]/)
  ) {
    return helpers.message(
      'Password must contain at least one uppercase letter, one number and one special character'
    )
  }
  return value
}
module.exports = { password }
