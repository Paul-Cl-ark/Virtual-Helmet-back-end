const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('./config/database') //database configuration
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

const app = express()
require('dotenv').load()

app.use(
	session({
		secret: process.env.EXPRESS_SESSION_TOKEN,
		resave: true,
		saveUninitialized: true,
		cookie: { domain: undefined }
	})
)

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

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(formData.parse())

app.post('/API/image-upload', (req, res) => {
	const values = Object.values(req.files)
	const promises = values.map(image => cloudinary.uploader.upload(image.path))

	Promise.all(promises).then(results => res.json(results))
})

const spots = require('./routes/spots')
const users = require('./routes/users')

// public route
app.use('/API/users', users)
// private route
app.use('/API/spots', spots)

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
