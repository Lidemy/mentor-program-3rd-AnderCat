const request = require('request');

const process = require('process');

const website = 'https://lidemy-book-store.herokuapp.com/books';

switch (process.argv[2]) {
  case 'list':
    request.get(
      website, (error, response, body) => {
        const books = JSON.parse(body);
        books.forEach((obj) => {
          console.log(`${obj.id} ${obj.name}`);
        });
      },
    );
    break;
  case 'read':
    request.get(
      website, (error, response, body) => {
        const books = JSON.parse(body);
        const bookName = books.filter(obj => obj.id === Number(process.argv[3]))
          .map(obj => obj.name);
        console.log(`${process.argv[3]} ${bookName}`);
      },
    );
    break;
  case 'delete':
    request.delete(
      `${website}/${process.argv[3]}`,
      (error, response) => {
        if (error === null && response.statusCode === 200) {
          console.log('刪除成功');
        } else {
          console.log(`刪除失敗 狀態碼${response.statusCode} 錯誤訊息${error}`);
        }
      },
    );
    break;
  case 'create':
    request.post(
      {
        url: website,
        form: {
          name: process.argv[3],
        },
      },
      (error, response) => {
        if (error === null && response.statusCode === 201) {
          console.log('創建成功');
        } else {
          console.log(`創建失敗 狀態碼${response.statusCode} 錯誤訊息${error}`);
        }
      },
    );
    break;
  case 'update':
    request.patch(
      {
        url: `${website}/${process.argv[3]}`,
        form: {
          name: process.argv[4],
        },
      },
      (error, response) => {
        if (error === null && response.statusCode === 200) {
          console.log('更新成功');
        } else {
          console.log(`更新失敗 狀態碼${response.statusCode} 錯誤訊息${error}`);
        }
      },
    );
    break;
  default:
    console.log('查無此功能，請使用 list、read、create、delete、update');
    break;
}
