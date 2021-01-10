'use strict'

const express = require('express')
const router = express.Router()
const mainController = require('../../controllers/main.controller')

router.get('/', mainController.promotions)
router.post('/generatePromotions', mainController.generatePromotions)
router.delete('/:id', mainController.deletePromotion)
router.put('/:id', mainController.editPromotion)
router.post('/duplicate/:id', mainController.duplicatePromotion)
router.post('/bulk', mainController.deletePromotions)

module.exports = router
