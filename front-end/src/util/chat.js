export const fetchResponse = async (prompt, token, chatId) => {
  const serverURL = process.env.REACT_APP_API_URL;
  const data = {
    prompt: prompt,
  };

  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    },
    body: formBody,
  };

  try {
    const fetchUrl = `${serverURL}/chat/${(chatId) || ''}`;
    const response = await fetch(
      fetchUrl,
      options
    );
    const data = await response.json();
    
    return data;
  } catch (errors) {
    throw new Error({message: errors.message});
  }
};
