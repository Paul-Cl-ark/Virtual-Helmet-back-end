const spotModel = require('../models/spots')

module.exports = {
	getById: (req, res, next) => {
		spotModel.findById(req.params.spotId, (err, spotInfo) => {
			if (err) {
				next(err)
			} else {
				res.json({ data: { spots: spotInfo } })
			}
		})
	},
	getAll: (req, res, next) => {
		let spotsList = []
		spotModel.find({}, (err, spots) => {
			if (err) {
				next(err)
			} else {
				for (let spot of spots) {
					spotsList.push(spot)
				}
				res.json({ data: { spots: spotsList } })
			}
		})
	},
	updateById: (req, res, next) => {
		const _id = req.body._id
		const userRating = req.body.rating
		const userId = req.user._id
		const userRatingObject = { user: userId, rating: userRating }

		spotModel.findOneAndUpdate(
			{ _id: _id },
			{ $inc: { rating: +userRating }, $push: { raters: userRatingObject } },
			{ new: true },
			(err, result) => {
				if (err) next(err)
				else {
					res.json({ message: 'Spot updated successfully!', data: result })
				}
			}
		)
	},
	deleteById: (req, res, next) => {
		spotModel.findByIdAndRemove(req.params.spotId, function(err, spotInfo) {
			if (err) next(err)
			else {
				res.json({ message: 'Spot deleted successfully!', data: null })
			}
		})
	},
	create: (req, res, next) => {
		const newSpot = {
			type: req.body.type,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			description: req.body.description,
			user: req.user._id,
			rating: 0,
			raters: [],
			image: req.body.image
		}
		spotModel.create(newSpot, (err, result) => {
			if (err) next(err)
			else {
				res.json({ message: 'Spot added successfully!', data: result })
			}
		})
	}
}
