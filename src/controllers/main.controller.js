'use strict'
const mongoose = require('mongoose')
const Promotion = require('../models/promotion.model');
const generateFakePromotions = require('../utils/mockGenerators');
const createPromotionFromDbItem = require('../utils/transformers');

exports.promotions = async (req, res, next) => {
    try {
        const { offset: skip = 0 , limit = 50 } = req.query
        let promotions = await Promotion.find({}, null, {limit: parseInt(limit), skip: parseInt(skip)});
        const formattedPromotions = promotions.map(promotion => createPromotionFromDbItem(promotion));
        res.status(200).send({promotions: formattedPromotions, total: await Promotion.count()});
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};

exports.deletePromotions = async (req, res, next) => {
    try {
        const { ids } = req.body
        await Promotion.deleteMany({ _id: ids });
        res.status(200).send();
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};

exports.deletePromotion = async (req, res, next) => {
    try {
        const { id } = req.params
        await Promotion.findOne({_id: id}).remove().exec()
        res.status(200).send();
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};

exports.editPromotion = async (req, res, next) => {
    try {
        const { id } = req.params
        await Promotion.findOneAndUpdate({_id: id}, req.body);
         res.status(200).send();
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};

exports.duplicatePromotion = async (req, res, next) => {
    try {
        const { id } = req.params
        const promotionFound = await Promotion.findOne({_id: id}).exec()
        const duplicatedPromotion = new Promotion({name: promotionFound.name, type: promotionFound.type, startDate: promotionFound.startDate, endDate: promotionFound.endDate, userGroupName: promotionFound.userGroupName});
        const promotionWithId = await duplicatedPromotion.save();
        res.status(200).send(createPromotionFromDbItem(promotionWithId));
    }
    catch (error) {
        console.log(error)
        next(error)
    }
};

exports.generatePromotions = async (req, res, next) => {
    try {
        let promotions = generateFakePromotions()
        await Promotion.insertMany(promotions)
        res.status(200).send(true);
    }
    catch (error) {
        next(error)
    }
};