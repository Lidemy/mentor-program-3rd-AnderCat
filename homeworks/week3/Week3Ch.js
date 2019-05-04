function add(a, b) {
  const maxLength = a.length > b.length ? a.length : b.length;
  const result = [];
  let addNum = 0;
  let over = 0;
  for (let i = maxLength - 1; i >= 0; i -= 1) {
    const pos = i - maxLength;
    const numA = Number(a[pos + a.length] ? a[pos + a.length] : '0');
    const numB = Number(b[pos + b.length] ? b[pos + b.length] : '0');
    addNum = numA + numB + over;
    over = addNum > 9 ? 1 : 0;
    result.unshift(add % 10);
  }
  if (over === 1) result.unshift(1);
  return result.join('');
}
function mult(a, b) {
  const multresult = [];
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const result = [];
    let multover = 0;
    let multiple = 0;
    for (let j = b.length - 1; j >= 0; j -= 1) {
      multiple = Number(a[i]) * Number(b[j]) + multover;
      multover = multiple > 9 ? Math.floor(multiple / 10) : 0;
      result.unshift(multiple % 10);
    }
    if (multover >= 1)result.unshift(multover);
    multresult.push(result.join('') + '0'.repeat(a.length - i - 1));
  }
  let col = '0';
  for (let k = 0; k < multresult.length; k += 1) {
    col = add(col, multresult[k]);
  } return col;
}
module.exports = mult;
