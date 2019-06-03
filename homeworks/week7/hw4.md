## 什麼是 DOM？

DOM 全名是 Document Object Model，可以將 HTML 文件內的各個標籤轉化成類似物件的東西，形成一個樹狀結構的模型。

DOM 可以當作 javascript 和瀏覽器之間溝通的橋樑，透過 DOM 可以讓 javascript 操控 HTML 元素，從而實現我們想要的功能。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞可以分為 3 個階段，分別是 1.捕獲 2.目標本身 3.冒泡。

捕獲階段指的是從 window 上觸發事件開始，傳遞事件到目標的過程稱為捕獲階段。

目標本身這裡並沒有分先捕獲還是先冒泡，端看你程式碼怎麼寫。

冒泡階段則是從目標傳回 window 的過程。

監聽事件可以選擇要在捕獲階段或冒泡階段，預設是 false 在冒泡階段。

## 什麼是 event delegation，為什麼我們需要它？

今天當有一個按鈕需要監聽，你就加一個 eventListener，那如果有 100 個按鈕的時候不就得加 100 個 eventListener?這時候就要靠
事件傳遞裡的冒泡機制。

根據事件傳遞機制，如果沒有設定 stopPropagation，那所有的事件都會經過至少 1 個相同的節點，今天當我們直接監聽這個節點就可以解決
需要多個 eventListener，的問題，這同時還有個好處是，如果你的按鈕是在瀏覽器動態新增上去的，這個方法也可以解決監聽的問題。
 
## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault 阻止預設動作，像在 form 裡就是阻止表單的送出，a 則是阻止跳出網址。

event.stopPropagation 阻止事件傳遞，上面提到事件傳遞時會分成 3 個階段，當我們在 addEventListener 裡加上 stopPropagation 時，
預設會是阻止冒泡階段，所以事件只會傳到目標本身就停下，如果只想在捕獲階段傳遞，在 addEventListener 的第三個參數加上 true 就可以了。