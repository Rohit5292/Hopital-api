const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');
mongoose.set('strict', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connecting to MongoDB:'));
db.once('open', () => {
    console.log('MongoDB connected');
});
module.exports = db;
