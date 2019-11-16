const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  channel_id: {
    type: String,
    Required: 'Kindly enter the channel_id'
  },
  user_id: {
    type: String,
    Required: 'Kindly enter the user id'
  },
  query: {
    type: String,
    Required: 'Kindly enter the search query'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('UserHistory', UserSchema);