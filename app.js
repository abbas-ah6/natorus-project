const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = '3000';
// Third party middleware
app.use(
  morgan('dev', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' }),
  })
);
app.use(morgan('dev'));

// Middleware for accessing request methods body => req.body
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

// Read Tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    message: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid id',
    });
  } else {
    res.status(200).json({
      message: 'success',
      data: {
        tour,
      },
    });
  }
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {  
      if (err) {
        console.log('Error creating tour:', err);
      }
      res.status(201).json({
        message: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: '404 Not Found',
      message: 'Invalid tour id',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid id',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Here is the tour!!>',
      },
    });
  }
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.patch('/api/v1/tours/:id', updateTour);

// Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

app.listen(PORT, () => {
  console.log(`Lisiting to the app at ${PORT}...`);
});
