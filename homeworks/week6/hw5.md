## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

<audio> 可以放音樂檔案，用法是`<audio src = "audio.wav"></audio>`

<legend> 組合表單與文字，可以把中間的文字放在線框上

<select> 會變成下拉式表單可以搭配 <option> 來寫裡面選項

## 請問什麼是盒模型（box model）

盒模型就是把每個元素都看成是一個盒子，可以透過這個盒子來控制它的邊距、寬高等。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

inline 可以讓元素放在同一行但不能調整上下的 margin 不會有影響，調整上下 padding 則只會影響背景大小，不會影響裡面元素的位置。

block 是 div,p 預設，每個元素會自動換行，無法排在同一個 row 上

inline-block 是綜合上面兩個的特性，可以排在同一 row 的同時，又可以調整上下 margin 和 padding 不受限制。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

static 是網頁預設的定位方式，是透過盒模型以及 display 來決定下一個元素應該要畫在哪裡。

relative 則是根據 static 以及 四個方向(top bottom left right) 來決定下一個元素應該要畫在哪裡。

absolute 會把這個元素的上層'非 static'元素當 absolute 的參考點，如果上層的元素都是 static ，則根據 body 來當參考點。
// 原本只寫 relative 可以當參考點，感謝老師修正。

fixed 根據 view port 來做定位，不會因為上下左右滾動而改變位置。

