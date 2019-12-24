'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const mainRouter = require('./main.route')

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter) // mount auth paths
router.use('/main', mainRouter) // mount auth paths

module.exports = router
