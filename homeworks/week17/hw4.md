``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

``` output 
2
2
undefined
```

`obj.inner.hello()`
上面這個是語法糖的形式，實際上要使用 function 應該是 function call 這個形式，所以我們可以把這段程式碼轉成 `obj.inner.hello.call(obj.inner)`，call 裡面代的值就是 hello 這個 function 前的值，同時這個值就是 this。

所以這邊 this 就等於 obj.inner = 2

`obj2.hello()`
一樣的方法轉換為`obj2.hello.call(obj2)`，obj2 = obj.inner = 2，這邊 this 的值也是 2

`hello()`
轉為 `hello.call()` 由於括號內沒值，所以 this 為 undefined。