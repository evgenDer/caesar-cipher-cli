const fs = require('fs');
const stream = require('stream');
const encrypt = require('../tools/encrypt');

function transformStream({ action, shift }) {
  class CipherTransformer extends stream.Transform {
    _transform(data, encoding, callback) {
      const msg = data.toString('utf8');
      const shiftNumber = +shift;
      const cipherText =
        action === 'encode'
          ? encrypt(msg, shiftNumber)
          : encrypt(msg, -shiftNumber);
      this.push(cipherText);
      callback();
    }
  }

  return new CipherTransformer();
}

function readStream(filePath) {
  if (!filePath) {
    return process.stdin;
  }

  return fs.createReadStream(filePath);
}

module.exports = {
  readStream,
  transformStream,
  writeStream,
};

function writeStream(filePath) {
  if (!filePath) {
    return process.stdout;
  }

  return fs.createWriteStream(filePath, { flags: 'a' });
}
