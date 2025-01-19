import Filter from 'bad-words';

export const changeToNumber = str => {
  if (str.length !== 0) {
    const numberOfStr = Number(str);
    return numberOfStr;
  } else {
    return str;
  }
};

/**
 * this sanitizer is used for changing the first Character of a word to uppercase
 * @param {*} word
 * @returns
 */
export const changeToUpperCase = word => {
  if (word.length !== 0) {
    const parts = word.split(' ');
    const changedParts = parts.map(el => el[0].toUpperCase() + el.slice(1));
    return changedParts.join(' ');
  }
  return word;
};

/**
 * this function is going to filter a text if it contains some predefined bad words
 * @param {*} paragraph
 * @returns
 */
export const filterBadWordSanitizer = paragraph => {
  if (!paragraph.length === 0) {
    const badWords = ['foolish', 'bad', 'wrong', 'crazy'];
    const filter = new Filter();
    filter.addWords(...badWords);
    return filter.clean(paragraph);
  }
  return paragraph;
};
