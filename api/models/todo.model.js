const {Schema, model} = require('mongoose')

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
})

module.exports = model('todos', todoSchema)