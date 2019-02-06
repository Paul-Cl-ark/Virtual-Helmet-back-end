module.exports = {
	ensureAuthenticated: function(req, res, next) {
		console.log('ensure auth', req.isAuthenticated, req.isAuthenticated())
		if (req.isAuthenticated()) {
			console.log('in the isAuth method: ', 'req: ', req, 'res: ', res)
			return next()
		}
		res.json({
			status: 'Please log in!'
		})
	}
}
