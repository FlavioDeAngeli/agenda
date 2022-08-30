//Import local modules
const { format } = require("date-fns"); // DATE FORMATTER

//Import common-core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const EventEmitter = require("events");

//Log events function
const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd - HH:mm:ss")}`;
  const logItem = `${dateTime} - ${message}\n`; // \t = tab spacing, \n = line break
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "../", "logs"))) {
      //if the directory doesn't exist, create it
      await fsPromises.mkdir(path.join(__dirname, "../", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "../", "logs", "eventLog.txt"), //(path, 'folder', 'fileName') content
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

//Events Logger Creation
class MyEmitter extends EventEmitter {}
const logger = new MyEmitter();
logger.on("log", (msg) => logEvents(msg));

module.exports = logger;
