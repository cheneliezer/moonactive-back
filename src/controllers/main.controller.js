'use strict'

const SavedUrl = require('../models/saved-url.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')
const User = require('../models/user.model')

exports.saveUrl = async (req, res, next) => {
    const body = req.body
    const usertoken = req.headers.authorization;
    try {
        const token = usertoken.split(' ');
        jwt.verify(token[1],config.secret,(err,id) => {
                User.findOne({_id: id.sub}, (err, user) => {
                    user.savedUrls.push({...body, createdAt: new Date().toTimeString()});
                    user.save();
                    res.status(200).send();
                })}
          );
}
    catch (error) {
        next(error)
    }
};

exports.getAllUrls = async (req, res, next) => {
    const usertoken = req.headers.authorization;
    try {
        const token = usertoken.split(' ');
        jwt.verify(token[1],config.secret,(err,id) => {
                User.findOne({_id: id.sub}, (err, user) => {
                    res.status(200).send({urlsGrid: user.savedUrls});
                })}
          );
    }
    catch (error) {
        next(error)
    }
};
