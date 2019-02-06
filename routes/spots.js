const express = require('express')
const router = express.Router()
const spotController = require('../app/api/controllers/spots')
const { ensureAuthenticated } = require('../helpers/auth')

router.get('/', spotController.getAll)
router.post('/', spotController.create)
router.get('/user-spots', ensureAuthenticated, spotController.getUserSpotsOnly)
router.get('/:spotId', spotController.getById)
router.put('/:spotId', spotController.updateById)
router.delete('/:spotId', spotController.deleteById)
module.exports = router
