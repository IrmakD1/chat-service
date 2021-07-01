const morgan = require('morgan')

module.exports = (tokens, req, res) => {
    if (tokens.url(req, res).includes("service-worker")) {
        console.log(tokens.url(req, res));
        return;
    }
    return [
      "_____________",
      `Method: ${tokens.method(req, res)};`,
      `Url: ${tokens.url(req, res)};`,
      `Status code: ${tokens.status(req, res)};`,
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      "_____________",
    ].join(" ");
}
