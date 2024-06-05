const dotenv = require('dotenv');
const mongoose = require('mongoose');   

dotenv.config({ path: `./config.env` });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log("Connected to Database successfully!");
}).catch(err => {console.log("Error in database connection: ", err)})

// console.log(app.get('env'));
// console.log(process.env)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening to the app at ${PORT}...`);
});