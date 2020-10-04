const fs = require('fs');
const { Transform } = require('stream');
const encrypt = require('../tools/encrypt');

function transformStream({ action, shift }) {
  class CipherTransformer extends Transform {
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

function writeStream(filePath) {
  if (!filePath) {
    return process.stdout;
  }

  return fs.createWriteStream(filePath, { flags: 'a' });
}

module.exports = {
  readStream,
  transformStream,
  writeStream,
};
