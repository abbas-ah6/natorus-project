const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `./config.env` });
// console.log(app.get('env'));
// console.log(process.env)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Lisiting to the app at ${PORT}...`);
});