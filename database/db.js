
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://benya:o9CMqbTisDornkeU@nodeservice.qmdjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;
