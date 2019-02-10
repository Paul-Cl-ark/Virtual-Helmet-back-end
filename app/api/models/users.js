const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcryptjs')
const saltRounds = 10

const SchemaTypes = mongoose.Schema.Types

const Schema = mongoose.Schema
const UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	image: {
		type: String,
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

UserSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, saltRounds)
	next()
})

UserSchema.plugin(uniqueValidator, { message: 'is already in use.' })

module.exports = mongoose.model('User', UserSchema)
