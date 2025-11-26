const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  ingredients: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one ingredient']
  },
  steps: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one step']
  },
  imageUrl: {
    type: String,
    match: /^https?:\/\//,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
