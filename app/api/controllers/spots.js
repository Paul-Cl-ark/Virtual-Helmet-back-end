const spotModel = require('../models/spots')
module.exports = {
	getById: function(req, res, next) {
		console.log(req.body)
		spotModel.findById(req.params.spotId, function(err, spotInfo) {
			if (err) {
				next(err)
			} else {
				res.json({ status: 'success', message: 'Spot found!', data: { spots: spotInfo } })
			}
		})
	},
	getAll: function(req, res, next) {
		let spotsList = []
		spotModel.find({}, function(err, spots) {
			if (err) {
				next(err)
			} else {
				for (let spot of spots) {
					spotsList.push({
						id: spot._id,
						type: spot.type,
						latitude: spot.latitude,
						longitude: spot.longitude,
						description: spot.description
					})
				}
				res.json({ status: 'success', message: 'Spots list found!', data: { spots: spotsList } })
			}
		})
	},
	updateById: function(req, res, next) {
		spotModel.findByIdAndUpdate(
			req.params.spotId,
			{
				type: req.body.type,
				latitude: req.body.latitude,
				longitude: req.body.latitude,
				description: req.body.description
			},
			function(err, spotInfo) {
				if (err) next(err)
				else {
					res.json({ status: 'success', message: 'Spot updated successfully!', data: null })
				}
			}
		)
	},
	deleteById: function(req, res, next) {
		spotModel.findByIdAndRemove(req.params.spotId, function(err, spotInfo) {
			if (err) next(err)
			else {
				res.json({ status: 'success', message: 'Spot deleted successfully!', data: null })
			}
		})
	},
	create: function(req, res, next) {
		spotModel.create(
			{
				type: req.body.type,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				description: req.body.description
			},
			function(err, result) {
				if (err) next(err)
				else res.json({ status: 'success', message: 'Spot added successfully!', data: null })
			}
		)
	}
}
