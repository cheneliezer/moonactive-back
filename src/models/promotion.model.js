'use strict'
const mongoose = require('mongoose')
const httpStatus = require('http-status')

const Schema = mongoose.Schema

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  userGroupName: {
    type: String,
    required: true,
  },
}, )




promotionSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'startDate', 'endDate', 'userGroupName']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  },

})

promotionSchema.statics = {

  checkDuplicatedUrlError (err) {
    if (err.code === 11000) {
      var error = new Error('Promotion already exists')
      error.errors = [{
        field: ['id'],
        location: 'body',
        messages: ['Promotion already exists']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }

    return err
  },

}

module.exports = mongoose.model('Promotion', promotionSchema)
