const request = require('request');
const process = require('process');

const website = 'https://lidemy-book-store.herokuapp.com/books';
function listBooks() {
  request.get(
    website, (error, response, body) => {
      const books = JSON.parse(body);
      books.forEach((obj) => {
        console.log(`${obj.id} ${obj.name}`);
      });
    },
  );
}

function readBooks() {
  request.get(
    website, (error, response, body) => {
      const books = JSON.parse(body);
      const bookName = books.filter(obj => obj.id === Number(process.argv[3]))
        .map(obj => obj.name);
      console.log(`${process.argv[3]} ${bookName}`);
    },
  );
}

switch (process.argv[2]) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBooks();
    break;
  default:
    console.log('找不到此功能，請使用 list、read');
    break;
}
