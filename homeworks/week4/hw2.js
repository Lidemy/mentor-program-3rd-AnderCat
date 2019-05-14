const request = require('request');
const process = require('process');


request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
    const books = JSON.parse(body);
    const bookName = books.filter(obj => obj.id === Number(process.argv[3]))
      .map(obj => obj.name);
    switch (process.argv[2]) {
      case 'list':
        books.forEach((obj) => {
          console.log(`${obj.id} ${obj.name}`);
        });
        break;
      case 'read':
        console.log(`${process.argv[3]} ${bookName}`);
        break;
      default:
        console.log('找不到此功能，請使用 list、read');
        break;
    }
  },
);
