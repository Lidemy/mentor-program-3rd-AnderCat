const request = require('request');


request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    const books = JSON.parse(body);
    books.forEach((obj) => {
      console.log(`${obj.id} ${obj.name}`);
    });
  },
);
