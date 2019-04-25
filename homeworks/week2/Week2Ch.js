function search(arr, n) {
  let head = 0;
  let last = arr.length - 1;
  for (let i = 0; i < arr.length; i += 1) {
    const site = Math.round((head + last) / 2);
    if (head === last) return -1;
    if (arr[site] === n) return site;
    if (arr[site] > n) last = site;
    else head = site;
  } return -1;
}

console.log(search([1, 3, 10, 14, 39], 14));
console.log(search([1, 3, 10, 14, 39], 299));
