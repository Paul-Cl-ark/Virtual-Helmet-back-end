const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/virtual-helmet-back-end'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
module.exports = mongoose
