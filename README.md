# caesar-cipher-cli

## How to install:

1. Clone this repository
2. Go to the folder(caesar-cipher-cli\caesar-cipher-cli)
3. npm install

## How to use:

To run program write: node src/app.js <options>
Acceptable options:

-s, --shift: a number of character to cipher (only positive integer)

-i, --input: an input file (optional)

If this command isn't provided - enter a text to the terminal
-o, --output: an output file (optional)

If this command isn't provided - a ciphred text will be printed in the terminal
-a, --action: an action (encode/decode)

## Usage example

$ node caesar-cipher.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
$ node caesar-cipher.js --action encode --shift 7 --input _your-first-file.txt_ --output _your-second-file.txt_
$ node caesar-cipher.js --action decode --shift 7 --input _your-first-file.txt_ --output _your-second-file.txt_
