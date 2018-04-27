// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db);

    require('../app/models/user.server.model');
    require('../app/models/course.server.model');
    require('../app/models/task.server.model');
    return db;
};