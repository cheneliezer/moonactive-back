'use strict'
const mongoose = require('mongoose')
const httpStatus = require('http-status')

const Schema = mongoose.Schema



const urlScema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
})




urlScema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'url', 'createdAt']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  },

})

urlScema.statics = {

  checkDuplicatedUrlError (err) {
    if (err.code === 11000) {
      var error = new Error('Url already exists')
      error.errors = [{
        field: ['url'],
        location: 'body',
        messages: ['Url already exists']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }

    return err
  },

}

module.exports = mongoose.model('SavedUrl', urlScema)
