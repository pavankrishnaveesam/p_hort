/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const one = str1.toUpperCase();
  const two = str2.toUpperCase();
  for (const x of one) {
    if (!two.includes(x)) return false;
  }
  return true;
}

module.exports = isAnagram;
