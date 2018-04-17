const mongoose = require('mongoose');

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/db_finance'
module.exports = mongoose.connect(url, { useMongoClient: true });
