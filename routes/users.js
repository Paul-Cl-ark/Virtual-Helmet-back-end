const express = require('express')
const router = express.Router()
const userController = require('../app/api/controllers/users')

const passport = require('passport')

// passport config
require('../config/passport')(passport)

router.post('/register', userController.create)

router.post('/authenticate', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.json({ message: 'Invalid credentials' })
		}
		req.logIn(user, err => {
			if (err) {
				return next(err)
			}
			return res.json({ user: user })
		})
	})(req, res, next)
})
module.exports = router

router.get('/logout', (req, res) => {
	req.logout()
})
