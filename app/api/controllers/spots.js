const spotModel = require('../models/spots')
const { ensureAuthenticated } = require('../../../helpers/auth')

module.exports = {
	getById: (req, res, next) => {
		console.log(req.body)
		spotModel.findById(req.params.spotId, (err, spotInfo) => {
			if (err) {
				next(err)
			} else {
				res.json({ status: 'success', message: 'Spot found!', data: { spots: spotInfo } })
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
					spotsList.push({
						id: spot._id,
						type: spot.type,
						latitude: spot.latitude,
						longitude: spot.longitude,
						description: spot.description,
						user: spot.user
					})
				}
				res.json({ status: 'success', message: 'Spots list found!', data: { spots: spotsList } })
			}
		})
	},
	getUserSpotsOnly: (req, res, next) => {
		console.log(req.user)
		let spotsList = []
		spotModel.find({ user: req.user.id }, (err, spots) => {
			if (err) {
				next(err)
			} else {
				for (let spot of spots) {
					spotsList.push({
						id: spot._id,
						type: spot.type,
						latitude: spot.latitude,
						longitude: spot.longitude,
						description: spot.description,
						user: spot.user
					})
				}
				res.json({ status: 'success', message: 'Spots list found!', data: { spots: spotsList } })
			}
		})
	},
	updateById: (req, res, next) => {
		spotModel.findByIdAndUpdate(
			req.params.spotId,
			{
				type: req.body.type,
				latitude: req.body.latitude,
				longitude: req.body.latitude,
				description: req.body.description
			},
			(err, spotInfo) => {
				if (err) next(err)
				else {
					res.json({ status: 'success', message: 'Spot updated successfully!', data: null })
				}
			}
		)
	},
	deleteById: (req, res, next) => {
		spotModel.findByIdAndRemove(req.params.spotId, function(err, spotInfo) {
			if (err) next(err)
			else {
				res.json({ status: 'success', message: 'Spot deleted successfully!', data: null })
			}
		})
	},
	create: (req, res, next) => {
		const newSpot = {
			type: req.body.type,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			description: req.body.description,
			user: req.user.id,
			rating: 0,
			raters: [],
			image: req.body.image
		}
		spotModel.create(newSpot, (err, result) => {
			if (err) next(err)
			else {
				console.log(result)
				res.json({ status: 'success', message: 'Spot added successfully!', data: result })
			}
		})
	}
}
