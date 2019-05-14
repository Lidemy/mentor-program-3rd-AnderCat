## 請以自己的話解釋 API 是什麼

API 又叫應用程式介面，你可以透過這個介面向服務端發送請求，服務端會回傳相應的 response。
API 就像是一個服務窗口，你可以透過這個服務窗口獲取別的 server 的服務，就好比銀行的櫃檯，你可透過銀行的櫃檯得到存錢、轉帳、貸款等等的服務，你並不需要知道後面的運作細節，你只要知道如何使用這個服務就可以了。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹

505 HTTP Version Not supported 表示不支援的HTTP版本
409 Conflict 表示請求與服務器目標的當前狀態衝突
205 Reset Content 回應 client 端表示重設內容成功


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL:http://restaurant.manage.com 
說明|Method|path|參數|範例|
---|------|----|----|----|
獲取所有餐廳|GET|/datas|_limit:限制回傳資料數量|/datas?_limit=5|
獲取單一餐廳|GET|/datas/:id|無|/datas/3|
新增餐廳|POST|/datas|name:餐廳名稱,type:料理類型,stars:平均評價|無|
刪除餐廳|DELETE|/datas/:id|無|/datas/4|
更改餐廳資料|PATCH|/datas/:id|name:餐廳名稱,type:料理類型,stars:平均評價|無|
