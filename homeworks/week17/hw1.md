``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

``` output
1
3
5
2
4
```

``` 執行過程
1.`console.log(1)` 進入 Call Stack 直接執行，印出 1 後從 Call Stack pop
2.`setTimeout(() => { console.log(2) }, 0)` 進入 Call Stack 看到是 setTimeout 把 setTimeout 放到 WebApi 並設置計時器給它，經過 0 秒後會把 `console.log(2)` 放到 callback queue。
3.`console.log(3)` 進入 Call Stack 直接執行，印出 3 後從 Call Stack pop
4.`setTimeout(() => { console.log(4) }, 0)` 進入  Call Stack 看到是 setTimeout 把 setTimeout 放到 WebApi 並設置計時器給它，經過 0 秒後會把 `console.log(4)` 放到 callback queue。
5.`console.log(5)` 進入 Call Stack 直接執行，印出 5 後從 Call Stack pop
6.確認 Call Stack 沒東西後，檢查 Callback Queue 把`console.log(2)`，放到 Call Stack
7.執行 `console.log(2)`，印出 2 後從 Call Stack pop
8.從 Callback Queue 把`console.log(4)`，放到 Call Stack
9.執行 `console.log(4)`，印出 4 後從 Call Stack pop
10.程式結束
```