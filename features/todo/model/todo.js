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
    default: '#FFFFFF',
    validate: {
      validator: function(input) {
        return /#[a-f0-9]{6}/i.test(input);
      },
      message: '{VALUE} is not a valid HEX color'
    }
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
