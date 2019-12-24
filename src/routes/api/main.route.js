'use strict'

const express = require('express')
const router = express.Router()
const mainController = require('../../controllers/main.controller')
const auth = require('../../middlewares/authorization')

router.post('/saveUrl', auth(), mainController.saveUrl)
router.get('/urlsGrid', auth(), mainController.getAllUrls)

module.exports = router
