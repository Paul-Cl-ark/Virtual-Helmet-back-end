const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/virtual-helmet-back-end'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
module.exports = mongoose
