const { createWriteStream } = require('fs');

module.exports = {
  stream: createWriteStream('./access.log', { flags: 'a' }) // creates access.log file. Appends new logs to exiting file
}
