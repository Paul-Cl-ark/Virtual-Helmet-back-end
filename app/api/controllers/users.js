const userModel = require('../models/users')
const passport = require('passport')

// passport config
require('../../../config/passport')(passport)

module.exports = {
	create: (req, res, next) => {
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			image: null
		}
		userModel.create(newUser, (err, user) => {
			if (err) next(err)
			else res.json({ user: user })
		})
	},
	update: (req, res, next) => {
		const url = req.body.image
		const id = req.user.id
		userModel.findOneAndUpdate(
			{ _id: id },
			{
				image: url
			},
			(err, result) => {
				if (err) next(err)
				else {
					res.json({ message: 'User updated successfully!', data: result })
				}
			}
		)
	}
}
