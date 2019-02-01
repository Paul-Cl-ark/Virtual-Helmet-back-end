const express = require('express')
const router = express.Router()
const spotController = require('../app/api/controllers/spots')
const { ensureAuthenticated } = require('../helpers/auth')

router.get('/', spotController.getAll)
router.post('/', ensureAuthenticated, spotController.create)
router.get('/:spotId', spotController.getById)
router.put('/:spotId', ensureAuthenticated, spotController.updateById)
router.delete('/:spotId', ensureAuthenticated, spotController.deleteById)
module.exports = router
