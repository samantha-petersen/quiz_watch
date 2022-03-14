const express = require("express")
const router = express.Router()
const User = require("../model/user_model");
const validateSignup = require("../middlewares/validation/validate_user")

router.post('/', validateSignup, (req, res) => {

  const { username, email, password } = req.body

  User.create(username, email, password)
    .then(user => {
      res.json({
        user: user,
        message: 'created user successfully'
      })
    });
})

module.exports = router;