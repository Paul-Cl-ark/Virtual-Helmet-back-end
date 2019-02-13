const spotModel = require('../models/spots')

module.exports = {
	getById: (req, res, next) => {
		const _id = req.params.spotId
		spotModel.findOne({ _id }, (err, spot) => {
			if (err) {
				next(err)
			} else {
				res.json(spot)
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

		spotModel.findOne({ _id: _id }, (err, spot) => {
			if (err) next(err)
			const existingVote = spot.raters.find(rating => {
				rating.user === userId
			})
			if (existingVote && existingVote.rating === userRating) {
				return res.status(409).send({ message: 'You can only vote once!' })
			} else if (existingVote && existingVote.rating !== userRating) {
				existingVote.rating = userRating
				spot.rating += userRating
				return res.json({ data: spot })
			} else {
				spot.rating += userRating
				spot.raters.push(userRatingObject)
				return res.json({ data: spot })
			}
		})

		// spotModel.findOneAndUpdate(
		// 	{ _id: _id },
		// 	{ $inc: { rating: +userRating }, $push: { raters: userRatingObject } },
		// 	{ new: true },
		// 	(err, result) => {
		// 		if (err) next(err)
		// 		else {
		// 			res.json({ message: 'Spot updated successfully!', data: result })
		// 		}
		// 	}
		// )
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
			image: req.body.image || null
		}
		spotModel.create(newSpot, (err, result) => {
			if (err) next(err)
			else {
				res.json({ message: 'Spot added successfully!', data: result })
			}
		})
	}
}
