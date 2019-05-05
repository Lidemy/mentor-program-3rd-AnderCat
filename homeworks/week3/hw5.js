function add(a, b) {
  const maxLength = a.length > b.length ? a.length : b.length;
  const result = [];
  let addNum = 0;
  let over = 0;
  for (let i = maxLength - 1; i >= 0; i -= 1) {
    addNum = Number(a[i - maxLength + a.length] ? a[i - maxLength + a.length] : '0') + Number(b[i - maxLength + b.length] ? b[i - maxLength + b.length] : '0') + over;
    over = addNum > 9 ? 1 : 0;
    result.unshift(add % 10);
  }
  if (over === 1) result.unshift(1);
  return result.join('');
}
console.log(add('55555', '55555'));
module.exports = add;
