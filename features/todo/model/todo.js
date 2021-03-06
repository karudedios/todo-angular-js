'use strict';
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  desc: {
    type: String,
    required: false,
    default: ''
  },

  color: {
    type: String,
    required: false,
    default: '#607D8B',
    validate: {
      validator: function(input) {
        return /#[a-f0-9]{6}/i.test(input);
      },
      message: '{VALUE} is not a valid HEX color'
    }
  },

  owner: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
