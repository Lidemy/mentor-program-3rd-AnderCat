function capitalize(str) {
  let result = '';
  result += str[0].toUpperCase();
  result += str.slice(1);
  return result;
}

console.log(capitalize('hello'));
console.log(capitalize('Nick'));
console.log(capitalize(',hello'));
