const express = require('express')
const logger = require('morgan')
const spots = require('./routes/spots')
const users = require('./routes/users')
const bodyParser = require('body-parser')
const mongoose = require('./config/database') //database configuration
const jwt = require('jsonwebtoken')
const passport = require('passport')

const app = express()
require('dotenv').load()

app.set('secretKey', process.env.TOKEN) // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

// public route
app.use('/users', users)
// private route
app.use('/spots', validateUser, spots)
app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204)
})
function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
		if (err) {
			res.json({ status: 'error', message: err.message, data: null })
		} else {
			// add user id to request
			req.body.userId = decoded.id
			next()
		}
	})
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})
// handle errors
app.use(function(err, req, res, next) {
	console.log(err)

	if (err.status === 404) res.status(404).json({ message: 'Not found' })
})
app.listen(3001, function() {
	console.log('Node server listening on port 3001')
})
