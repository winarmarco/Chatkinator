export const checkJSON = (text) => {
  return (/^[\],:{}\s]*$/.test(
    text
      .replace(/\\["\\\/bfnrtu]/g, "@")
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "]"
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  ));
};


export const failedToFetch = (error) => {
  return error.message === "Failed to fetch";
}