function join(str, concatStr) {
  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    if (i !== 0) {
      result += concatStr;
    }
    result += str[i];
  }
  return result;
}

function repeat(str, times) {
  let result = '';
  for (let i = 0; i < times; i += 1) {
    result += str;
  }
  return result;
}

console.log(join([1, 2, 3], ''));
console.log(join(['a', 'b', 'c'], '!'));
console.log(join(['a', 1, 'b', 2, 'c', 3], ','));

console.log(repeat('a', 5));
console.log(repeat('yo', 3));
