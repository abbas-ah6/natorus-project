const fs = require('fs');
const express = require('express');

const app = express();
const PORT = '3000';

// app.get('/', (req, res) => {
//   res.status(200);
//   res.json({
//     message: 'success',
//     name: 'Narotus App',
//   });
// });

// app.post('/', (req, res) => {
//   res.send('This is the post method...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    message: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Lisiting to the app at ${PORT}...`);
});
