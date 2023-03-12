function reverseWordsInString(string) {
  // Write your code here.
  const reversedWords = [];

  if (string.length === 0) {
    return;
  }

  for (let i = string.length - 1; i >= 0; i--) {
    reversedWords.push(string[i]);
  }

  return reversedWords.join('');
}

// console.log(reverseWordsInString(''));
console.log(reverseWordsInString('AlgoExpert is the best!'));
