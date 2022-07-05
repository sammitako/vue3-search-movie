exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: "SAM",
      age: 13,
      email: "hsampk@naver.com",
    }),
  };
};
