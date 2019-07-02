資料庫名稱：comments

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 留言 id  |
| comment | text | 留言 |
| created_at | datetime | 留言時間 |
| nickname | varchar(64)| 留言要顯示的暱稱 |

資料庫名稱:users

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| nickname | varchar(64) | 會員暱稱 |
| username | varchar(16) | 會員帳號 |
| password | varchar(16) | 會員密碼 |