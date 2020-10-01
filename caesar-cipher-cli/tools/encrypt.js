function mod(n, p) {
  if (n < 0) n = p - (Math.abs(n) % p);
  return n % p;
}

function encrypt(msg, key) {
  const startCodeUpper = 65;
  const startCodeLower = 97;
  const endCodeLetter = 122;
  const countLetters = 26;
  let encMsg = '';
  for (let i = 0; i < msg.length; i++) {
    let code = msg.charCodeAt(i);
    let isLowerCase = false;
    if (code >= startCodeLower && code <= endCodeLetter) {
      isLowerCase = true;
      const upperLetter = msg[i].toUpperCase();
      code = upperLetter.charCodeAt(0);
    }
    if (code >= startCodeUpper && code <= startCodeUpper + countLetters - 1) {
      code -= startCodeUpper;
      code = mod(code + key, countLetters);
      code += startCodeUpper;
    }
    const encLetter = String.fromCharCode(code);
    encMsg += isLowerCase ? encLetter.toLocaleLowerCase() : encLetter;
  }
  return encMsg;
}

module.exports = encrypt;
