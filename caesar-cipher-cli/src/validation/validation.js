const fs = require('fs');

function writeErrorStream(errorMsg) {
  process.stderr.write(errorMsg);
  process.exit(3);
}

function validationOptions({ shift, action, input, output }) {
  if (!action) {
    writeErrorStream('Action is required');
  }

  if (!shift) {
    writeErrorStream('Shift is required');
  }

  if (action !== 'encode' && action !== 'decode') {
    writeErrorStream('Wrong action name. Encode or decode is alowable');
  }

  if (!Number.isInteger(+shift) || +shift < 0) {
    writeErrorStream('Shift must be positive integer');
  }

  if (input && !fs.existsSync(input) && !fs.accessSync(input)) {
    writeErrorStream('Input file was not found');
  }

  if (output && !fs.existsSync(output) && !fs.accessSync(input)) {
    writeErrorStream('Output file was not found');
  }
}

module.exports = validationOptions;
