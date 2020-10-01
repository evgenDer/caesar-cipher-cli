const { Command } = require('commander');
const validationOptions = require('./src/validation/validation');
const program = new Command();
const { pipeline } = require('stream');
const fs = require('fs');
const { readStream, writeStream, transformStream } = require('./src/stream/stream');

program
  .storeOptionsAsProperties(true)
  .requiredOption('-s, --shift <number>', 'a shift number')
  .requiredOption('-a, --action <type action>', 'an action encode/decode')
  .option('-i, --input [filename]', 'an input file')
  .option('-o, --output [filename]', 'an output file');

program.parse(process.argv);

const options = program.opts();

validationOptions(options);

pipeline(
  readStream(options.input),
  transformStream(options),
  writeStream(options.output),
  (err) => {
    if (err) console.error;
  }
);
