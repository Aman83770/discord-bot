const router = require("superagent");
const { google_key, custom_engine_id } = require('./config/app.js');

// google custom search API Endpoint
const url = "https://www.googleapis.com/customsearch/v1";

const richEmbed = {
  color: 0x0099ff
};

async function search(query) {
  try {
    const res = await router.get(`${url}?key=${google_key}&cx=${custom_engine_id}&q=${query}&num=5`);

    const result = [];

    // Parse response of search into result Array
    res.body.items.forEach((obj) =>  {
      const subObj = {
        name: obj.title,
        value: obj.snippet + `[More Info](${obj.link})`,
      };
      result.push(subObj);
    });

    // Format rich embed for discord
    richEmbed.title = `Top 5 results of search '${query}':`
    richEmbed.fields = result;
    return richEmbed;
  } catch (err) {
    console.error(err);
  }
}

module.exports = search;