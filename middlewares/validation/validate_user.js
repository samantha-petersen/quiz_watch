const bcrypt = require("bcrypt")

function validationError(msg) {
  const error = new Error(msg)
  error.status = 422
  return error
}

function isNull(params) {
  if (params === "" || params === undefined || params === null)
    return true
}

function validateSignup(req, res, next) {
  const { username, email, password } = req.body

  if (isNull(username)) {
    throw validationError("Name is required")
  } else if (isNull(email)) {
    throw validationError("Email is required")
  } else if (isNull(password)) {
    throw validationError("Password is required")
  } else if (password.length < 8) {
    throw validationError("Password needs to be at least 8 characters long")
  } else if (!(/[A-Z]/.test(password))) {
    throw validationError("Password must contain at least one uppercase")
  } else if (!(/[0-9]/.test(password))) {
    throw validationError("Password must contain one number")
  }

  next()
}

module.exports = validateSignup