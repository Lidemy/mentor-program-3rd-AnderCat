function search(arr, n) {
  let head = 0;
  let last = arr.length - 1;
  for (let i = 0; i < arr.length; i += 1) {
    const site = Math.floor((head + last) / 2);
    if (arr[site] === n) return site;
    if (head === last) return -1;
    if (arr[site] > n) last = site - 1;
    else head = site + 1;
  } return -1;
}

console.log(search([1, 3, 10, 14, 39], 3));
console.log(search([1, 3, 10, 14, 39], 299));
