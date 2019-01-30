const mongoose = require('mongoose')
require('mongoose-double')(mongoose)
const SchemaTypes = mongoose.Schema.Types

const Schema = mongoose.Schema
const SpotSchema = new Schema({
	type: {
		type: String,
		trim: true,
		required: true
	},
	latitude: {
		type: SchemaTypes.Double,
		trim: true,
		required: true
	},
	longitude: {
		type: SchemaTypes.Double,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	}
})
module.exports = mongoose.model('Spot', SpotSchema)
