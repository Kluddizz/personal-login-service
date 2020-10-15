const path = require("path");
const dateFormat = require("dateformat");

const packageFileName = path.join(process.cwd(), "package.json");
const app = require(packageFileName);

const log = (message, tag = "info") => {
  const now = new Date();
  const dateTime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

  let tagColored;

  switch (tag) {
    case "info":
      tagColored = "\x1b[34m" + tag + "\x1b[0m";
      break;

    case "error":
      tagColored = "\x1b[31m" + tag + "\x1b[0m";
      break;

    default:
      tagColored = tag;
  }

  console.log(`[${app.name}][${dateTime}](${tagColored}) ${message}`);
};

module.exports = log;
