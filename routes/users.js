const express = require('express')
const router = express.Router()
const userController = require('../app/api/controllers/users')
const { ensureAuthenticated } = require('../helpers/auth')

const passport = require('passport')

// passport config
require('../config/passport')(passport)

router.post('/register', userController.create)

router.post('/authenticate', passport.authenticate('local'), (req, res) => {
	res.json({
		user: {
			id: req.user._id,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			date: req.user.date,
			image: req.user.image
		}
	})
})

router.put('/', ensureAuthenticated, userController.update)

router.get('/logout', (req, res) => {
	req.logout()
	return res.json({ message: 'User successfully logged out' })
})

module.exports = router
