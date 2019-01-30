const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	spots: [{ type: SchemaTypes.ObjectId, ref: 'Spot' }]
})

UserSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, saltRounds)
	next()
})
module.exports = mongoose.model('User', UserSchema)
