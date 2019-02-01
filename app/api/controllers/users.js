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
	}
}
