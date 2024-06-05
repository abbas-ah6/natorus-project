const fs = require('fs');
const Tour = require('./../models/toursModel');
const APIFeatures = require('./../utils/apiFeatures');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//     console.log(`Id is: ${val}`);

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: '404 Not Found',
//             message: 'Invalid id',
//         });
//     }
//     next()
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'Not Found',
//             message: 'Name or price is empty'
//         })
//     }
//     next();
// }

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty,summary'
    next();
}

exports.getAllTours = async (req, res) => {
    try {
        console.log(`QUERY: ${Tour.find()} QUERY STRING: ${req.query}`);
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // EXECUTE THE QUERY
        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        // const id = req.params.rating;
        // const tour = await Tour.find({rating: id});
        const id = req.params.id;
        const tour = await Tour.findById(id);
        res.status(200).json({
            message: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'Not Found',
            message: err
        })
    }
};

exports.createTour = async (req, res) => {
    // const newTour = new Tour({});
    // newTour.save();

    try {
        console.log(req.body);
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Bad Request',
            message: err,
        })
    }


    // const newId = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign({ id: newId }, req.body);
    // tours.push(newTour);
    // fs.writeFile(
    //     `${__dirname}/../dev-data/data/tours-simple.json`,
    //     JSON.stringify(tours),
    //     (err) => {
    //         if (err) {
    //             console.log('Error creating tour:', err);
    //         }
    //         res.status(201).json({
    //             message: 'success',
    //             data: {
    //                 tour: newTour,
    //             },
    //         });
    //     }
    // );
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'Bad Request',
            message: err
        })
    }
};