const axios = require("axios");
const {ServerError} = require("./errors");

const fetchResponse = async (prompt) => {
  const APIKEY = process.env.OPENAPI_KEY;
  
  const body = {
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 2048,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${APIKEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      body,
      options
    );
    const data = response.data;
  
    return data.choices[0].text.trim();
  } catch (error) {
    throw new ServerError("Cannot get bot response");
  }
};

const cleanTitle = (title) => {
    const re = /[\'\"\s]+(.+)[\'\"\s]+/;
    return title.match(re)[1];
}

const getTitle = async (prompt) => {
  try {
    const title = await fetchResponse(`Give a title for these sentences: '${prompt}'`)
    const cleannedTitle = cleanTitle(title);
    return cleannedTitle;
  } catch (error) {
    return new ServerError("Cannot get bot response");
  }
};

exports.fetchResponse = fetchResponse;
exports.getTitle = getTitle;
