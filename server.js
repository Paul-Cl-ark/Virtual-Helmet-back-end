const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('./config/database') //database configuration

const app = express()
require('dotenv').load()

app.use(session({ secret: process.env.TOKEN, resave: true, saveUninitialized: true }))

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

const spots = require('./routes/spots')
const users = require('./routes/users')

// public route
app.use('/users', users)
// private route
app.use('/spots', spots)
app.get('/favicon.ico', (req, res) => {
	res.sendStatus(204)
})

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use((req, res, next) => {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})
// handle errors
app.use((err, req, res, next) => {
	console.log(err)

	if (err.status === 404) res.status(404).json({ message: 'Not found' })
})
app.listen(3001, () => {
	console.log('Node server listening on port 3001')
})
