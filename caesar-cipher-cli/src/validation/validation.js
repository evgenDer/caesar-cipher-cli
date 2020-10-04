const fs = require('fs');

function writeErrorStream(errorMsg) {
  process.stderr.write(errorMsg);
  process.exit(3);
}

function validateFile(file, mode) {
  if (mode !== 'input' && mode !== 'output') {
    return false;
  }

  if (fs.existsSync(file)) {
    try {
      fs.accessSync(
        file,
        mode === 'input' ? fs.constants.W_OK : fs.constants.R_OK
      );
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }

  return true;
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

  if (input && !validateFile(input, 'input')) {
    writeErrorStream('Input file was not found or not accessible');
  }

  if (output && !validateFile(output, 'output')) {
    writeErrorStream('Output file was not found or not accessible');
  }
}

module.exports = validationOptions;
