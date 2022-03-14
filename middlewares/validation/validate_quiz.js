function validationError(msg) {
  const error = new Error(msg)
  error.status = 422
  return error
}

function isNull(params) {
  if (params === "" || params === undefined || params === null)
    return true
}

function validateFlashcard(req, res, next) {
  const { question, hint, answer } = req.body

  if (isNull(question)) {
    throw validationError("Question is required")
  } else if (isNull(hint)) {
    throw validationError("Hint is required")
  } else if (isNull(answer)) {
    throw validationError("Answer is required")
  }

  next()
}

module.exports = validateFlashcard