## 什麼是 Ajax？

Ajax 全名叫 Asynchronous JavaScript and XML，非同步傳遞資訊，可以在瀏覽器不重新整理的情況下就能和 server 交換資料，
XML 是目前比較少用的資料交換格式，現在都以 JSON 為主。

## 用 Ajax 與我們用表單送出資料的差別在哪？

表單送出資料後會將網頁導向一個新的網址，網頁內容也會重新 render 一次，另外表單可以不需要任何 js 程式碼。

使用 Ajax 則是可以局部的刷新網頁內容，透過 js 可以實時更新網頁內容，提高使用者體驗。

## JSONP 是什麼？

全名是 JSON with Padding ，原本使用 Ajax 時，因為瀏覽器的同源政策，即使有拿到 response 瀏覽器也不會給 js 做進一步的處理，這時候可以利用 html 的某幾個標籤(例如:<img>、<script/>)不受同源政策的這個方法，透過標籤向 server 要資料，然後假設 server 回傳資料中有個 Function，我們可以在
本地建一個相同名字的 Function 來呼叫它拿到資料。

## 要如何存取跨網域的 API？

1.JSONP

2.使用 CORS(跨來源資源共用)，在發送 request 的時候，要在 header 裡多加一個 Access-Control-Allow-Origin，如果寫的是`*`那就代表所有網域都可以
取得這個 server 的 response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為第四週使用的是 node.js 直接對 server 發請求，而跨網域問題(同源政策)是瀏覽器附加的限制。