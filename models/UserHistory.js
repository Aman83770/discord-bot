const mongoose = require('mongoose');

// register schema
require('./schema');

const UserHistory = mongoose.model('UserHistory');

// rich embed format
const richEmbed = {
  color: 0x0099ff
};

// store user search history
exports.storeUserHistory = function(channeId, userId, query) {
  const data = {
    channel_id: channeId,
    user_id: userId,
    query
  };
  return new Promise((resolve, reject) => {
    const newRecord = new UserHistory(data);
    newRecord.save((err) =>  {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

// get user search history
exports.getUserHistory = function(channeId, userId, keyword) {
  const searchParam = {
    channel_id: channeId,
    user_id: userId,
    query: { $regex: `.*${keyword}.*` }
  };

  return new Promise((resolve, reject) => {
    UserHistory.find(searchParam, (err, resp) =>  {
      if (err) {
        return reject(err);
      }

      const result = [];
      resp.forEach((obj) =>  {
        console.log(obj);
        result.push({name: new Date(obj.created_date).toLocaleString(), value: obj.query});
      })

      // Format rich embed for discord
      richEmbed.title = keyword ? `Recent history consisting keyword "${keyword}"` : "Recent History";
      richEmbed.fields = result;

      return resolve(richEmbed);
    });
  });
};
