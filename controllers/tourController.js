const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
    console.log(`Id is: ${val}`);

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: '404 Not Found',
            message: 'Invalid id',
        });
    }
    next()
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Not Found',
            message: 'Name or price is empty'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
    const id = req.params.id;
    const tour = tours.find((el) => el.id == id);
    res.status(200).json({
        message: 'success',
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Here is the tour!!>',
        },
    });
};