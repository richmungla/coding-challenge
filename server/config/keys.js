//Select file based on environment
//Ideally dev.js would not be commited
if (process.env.NODE_ENV == "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
