// https://github.com/tc39/proposal-string-pad-start-end/blob/master/polyfill.js

const RequireObjectCoercible = O => {
  if (O === null || typeof O === 'undefined') {
    throw new TypeError('"this" value must not be null or undefined');
  }
  return O;
};
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
const ToLength = argument => {
  const len = Number(argument);
  if (Number.isNaN(len) || len <= 0) { return 0; }
  if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
  return len;
};

// always, cause safari Tech Preview has a bug for this
if (!String.prototype.padStart || true) {
  String.prototype.padStart = function padStart(maxLength, fillString = ' ') {
    const O = RequireObjectCoercible(this);
    const S = String(O);
    const intMaxLength = ToLength(maxLength);
    const stringLength = ToLength(S.length);
    if (intMaxLength <= stringLength) { return S; }
    let filler = typeof fillString === 'undefined' ? ' ' : String(fillString);
    if (filler === '') { return S; }
    const fillLen = intMaxLength - stringLength;
    while (filler.length < fillLen) {
      const fLen = filler.length;
      const remainingCodeUnits = fillLen - fLen;
      if (fLen > remainingCodeUnits) {
        filler += filler.slice(0, remainingCodeUnits);
      } else {
        filler += filler;
      }
    }
    const truncatedStringFiller = filler.slice(0, fillLen);
    return truncatedStringFiller + S;
  };
}

if (!String.prototype.padEnd || true) {
  String.prototype.padEnd = function padEnd(maxLength, fillString = ' ') {
    const O = RequireObjectCoercible(this);
    const S = String(O);
    const intMaxLength = ToLength(maxLength);
    const stringLength = ToLength(S.length);
    if (intMaxLength <= stringLength) { return S; }
    let filler = typeof fillString === 'undefined' ? ' ' : String(fillString);
    if (filler === '') { return S; }
    const fillLen = intMaxLength - stringLength;
    while (filler.length < fillLen) {
      const fLen = filler.length;
      const remainingCodeUnits = fillLen - fLen;
      if (fLen > remainingCodeUnits) {
        filler += filler.slice(0, remainingCodeUnits);
      } else {
        filler += filler;
      }
    }
    const truncatedStringFiller = filler.slice(0, fillLen);
    return S + truncatedStringFiller;
  };
}