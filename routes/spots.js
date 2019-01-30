const express = require('express')
const router = express.Router()
const spotController = require('../app/api/controllers/spots')
router.get('/', spotController.getAll)
router.post('/', spotController.create)
router.get('/:spotId', spotController.getById)
router.put('/:spotId', spotController.updateById)
router.delete('/:spotId', spotController.deleteById)
module.exports = router
