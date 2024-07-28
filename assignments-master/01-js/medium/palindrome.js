/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // Remove non-alphabetic characters and convert to uppercase
  const sanitizedStr = str.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const size = sanitizedStr.length;

  if (size === 0 || size === 1) return true;

  // Check if the sanitized string is a palindrome
  for (let i = 0; i < size / 2; i++) {
    if (sanitizedStr[i] !== sanitizedStr[size - i - 1]) return false;
  }
  return true;
}

module.exports = isPalindrome;
