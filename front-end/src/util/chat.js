export const fetchResponse = async (body, token, chatId, method) => {
  const serverURL = process.env.REACT_APP_API_URL;

  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const options = {
    method: method || 'POST',
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
    
    if (!response.ok) {
      const errorMessage = data.message;
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error.message));
  }
};

export const fetchBotResponse = async (prompt, token, chatId) => {
  try {
    const data = await fetchResponse({prompt}, token, chatId, "POST");
    
    return data;
  } catch (error) {
    throw new Error(error);
  }
}


export const updateTitle = async (title, token, chatId) => {
  try {
    const data = await fetchResponse({title}, token, chatId, "PATCH");
    
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
