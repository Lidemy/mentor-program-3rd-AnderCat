``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

``` output
undefined
5
6
20
1
10 
100
``` output 

- Global EC 編譯
1. 進入 Global EC 並且初始化 VO 以及 scope chain

```
globalEC {
  VO{
    a: undefined
    fn: function
  },
  scopeChain: [globalEC.VO]
}
```

- Global EC 執行
2. 執行 Global EC 將 a 設為 1，之後看到 fn() 把 fn() 放到 Call Stack 進入 fn EC 編譯

```
globalEC {
  VO{
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[scope]] = globalEC.scopeChain
```

- fnEC 編譯
3. 進入 fn EC 並且初始化 AO 以及 scope chain

```
fnEC {
  AO {
    a: undefined
    fn2:function
  },
  scopeChain:[fn.AO]+fn.[[scope]]
}

globalEC {
  VO {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[scope]] = globalEC.scopeChain
```

- fnEC 執行
4. 執行 fnEC 將 `console.log(a)` 放到 Call stack ，此時 a 的值會先找 fnEC.AO 找到 undefined 印出，印出後從 Call stack pop 掉
5.`var a = 5` 把 a 值設為 5
6.把 `console.log(5)` 放到 Call stack，印出 5 後 pop 掉
7.a++ , a = 6
8.`var a` 設定參數 a ，發現 fnEC.AO 已有 a ，所以不做事
9.進入 fn2EC 並且初始化 AO 以及 scope chain 

```
fnEC {
  AO {
    a: 6
    fn2:function
  },
  scopeChain:[fn.AO]+fn.[[scope]]
  }
}


globalEC {
  VO {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}

fn2.[[scope]] = fnEC.scopeChain = [fnEC.AO,globalEC.VO]
```

- fn2EC 編譯
10.進入 fn2EC 並且初始化 AO 以及 scope chain(這邊 AO 沒有東西就不多寫了)

- fn2EC 執行
11.執行 fn2EC 將 `console.log(a)` 放到 Call stack，這邊在 fn2EC.AO 找不到 a 就透過 scope chain 往上一層找，在 fnEC.VO 找到 a 的值為 6，印出 6 後從 Call stack 中 pop 掉
12.`a = 20`把 fnEC.VO 的 a 設為 20`
13.`b = 100` fn2EC.AO 找不到 b 往上一層找，fnEC.AO 也找不到 b ，再往上到 globalEC.VO 找還是找不到，因為再往上就是 null ，js 會自動在 globalEC.VO 裡宣告一個 b 並給值 100，fn2EC 結束。

```
fn2EC: {
  AO: {
  },
  scopeChain: [fn2EC.AO fnEC.AO global.VO]
}
fnEC: {
  AO: {
    a: 20,
    fn2: function
  },
  scopeChain: [fnEC.AO global.VO]
}
globalEC: {
  VO: {
    a: 1,
    b: 100,
    fn: function
  },
  scopeChain: [global.VO]
}
```

- 接續 fnEC 執行
14.`console.log(a)` 到 fnEC.AO 找 a 的值為 20，將 `console.log(20)` 放到 Call stack ，印出 20 後從 Call stack 中 pop 掉。
15.fnEC() 結束從 Call stack 中 pop 掉

- 接續 globalEC 執行
16.`console.log(a)` 到 globalEC.VO 找 a 的值為 1，將 `console.log(1)` 放到 Call stack ，印出 1 後從 Call stack 中 pop 掉。
17. `a = 10` 到 globalEC.VO 把 a 的值設為 10 
18.`console.log(a)` 到 globalEC.VO 找 a 的值為 10，將 `console.log(10)` 放到 Call stack ，印出 10 後從 Call stack 中 pop 掉。
19.`console.log(b)`，到 globalEC.VO 找 b 的值為 100，將 `console.log(10)` 放到 Call stack ，印出 100 後從 Call stack 中 pop 掉。
20.globalEC 執行結束，從 Call stack 中 pop 掉。