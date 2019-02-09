const userModel = require('../models/users')
const passport = require('passport')

// passport config
require('../../../config/passport')(passport)

module.exports = {
	create: (req, res, next) => {
		newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		}
		userModel.create(newUser, (err, user) => {
			if (err) next(err)
			else res.json({ user: user })
		})
	}
}
