``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

``` output
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

``` 執行過程
1.給 i 值為 0 進入迴圈
- 第一圈迴圈
2.`console.log('i: ' + 0)` 進入 Call Stack 直接執行，印出 `i: 0` 後從 Call Stack pop
3.`setTimeout(() => { console.log(i) }, i * 1000)` 進入 Call Stack 看到是 setTimeout，把 setTimeout 放到 WebApi 並設置計時器，經過 0 秒後會放到 Callback Queue
4.執行 i++ ，i = 1
- 第二圈迴圈
5.`console.log('i: ' + 1)` 進入 Call Stack 直接執行，印出 `i: 1` 後從 Call Stack pop
6.`setTimeout(() => { console.log(i) }, i * 1000)` 進入 Call Stack 看到是 setTimeout，把 setTimeout 放到 WebApi 並設置計時器，經過 1 秒後會放到 Callback Queue
7.執行 i++ , i = 2
- 第三圈迴圈
8.`console.log('i: ' + 2)` 進入 Call Stack 直接執行，印出 `i: 2` 後從 Call Stack pop
9.`setTimeout(() => { console.log(i) }, i * 1000)` 進入 Call Stack 看到是 setTimeout，把 setTimeout 放到 WebApi 並設置計時器，經過 2 秒後會放到 Callback Queue
10.執行 i++, i = 3
- 第四圈迴圈
11.`console.log('i: ' + 3)` 進入 Call Stack 直接執行，印出 `i: 3` 後從 Call Stack pop
12.`setTimeout(() => { console.log(i) }, i * 1000)` 進入 Call Stack 看到是 setTimeout，把 setTimeout 放到 WebApi 並設置計時器，經過 3 秒後會放到 Callback Queue
13.執行 i++,i = 4
- 第五圈迴圈
14.`console.log('i: ' + 4)` 進入 Call Stack 直接執行，印出 `i: 4` 後從 Call Stack pop
15.`setTimeout(() => { console.log(i) }, i * 1000)` 進入 Call Stack 看到是 setTimeout，把 setTimeout 放到 WebApi 並設置計時器，經過 4 秒後會放到 Callback Queue
16.執行 i++,i = 5
17.因為 i = 5 不符合 i < 5 所以跳出迴圈。
18.確認 Call Stack 沒東西後，檢查 Callback Queue 把`console.log(i)`，放到 Call Stack(此時 i = 5)。
19.執行 `console.log(5)` 印出 5 後從 Call stack pop
20.重複 18.19 步驟直到 Call back queue 沒東西。
21.程式結束 