const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  url: { 
    type: String,
    required: true,
    minlength: 1
  },
  title: { 
    type: String,
    required: true,
    minlength: 1
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0,
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)