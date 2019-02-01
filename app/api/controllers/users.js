const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// passport config
require('../../../config/passport')(passport)

const jwt = require('jsonwebtoken')
module.exports = {
	create: function(req, res, next) {
		userModel.create(
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password
			},
			function(err, result) {
				if (err) next(err)
				else res.json({ status: 'success', message: 'User added successfully!', data: null })
			}
		)
	},
	authenticate: function(req, res, next) {
		passport.authenticate(
			'local',
			(function(err, user, info) {
				if (err) {
					next(err)
					debugger
				} else {
					// return res.json({
					// 	status: 'success',
					// 	message: 'User found!',
					// 	data: { user: user }
					// })
					debugger
				}
			})(req, res, next)
		)
	}
	// userModel.findOne({ email: req.body.email }, function(err, user) {
	// 	if (err) {
	// 		next(err)
	// 	} else {
	// 		if (bcrypt.compareSync(req.body.password, user.password)) {
	// 			const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), {
	// 				expiresIn: '1h'
	// 			})
	// 			res.json({
	// 				status: 'success',
	// 				message: 'User found!',
	// 				data: { user: user, token: token }
	// 			})
	// 		} else {
	// 			res.json({ status: 'error', message: 'Invalid email/password!', data: null })
	// 		}
	// 	}
	// })
	// }
}
