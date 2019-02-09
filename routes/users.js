const express = require('express')
const router = express.Router()
const userController = require('../app/api/controllers/users')

const passport = require('passport')

// passport config
require('../config/passport')(passport)

router.post('/register', userController.create)

router.post('/authenticate', passport.authenticate('local'), (req, res, next) => {
	return res.json({ user: req.user })
})

router.get('/logout', (req, res) => {
	req.logout()
	return res.json({ message: 'User successfully logged out' })
})

module.exports = router
