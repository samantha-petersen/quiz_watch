function logger(req, res, next) {
  console.log(`
  *** Date: ${new Date()}
  *** Method: ${req.method}
  *** Path: ${req.path}
  `)

  next()
}

module.exports = logger