const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/virtual-helmet-back-end'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
module.exports = mongoose
