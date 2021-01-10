'use strict'
const express = require('express')
const router = express.Router()
const promotionsRouter = require('./promotions.route')

router.use('/promotions', promotionsRouter) // mount auth paths

module.exports = router
