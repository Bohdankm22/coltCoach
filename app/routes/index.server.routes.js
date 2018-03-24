// Load the 'index' controller
const index = require('../controllers/index.server.controller');
const dashboard = require('../controllers/dashboard.server.controller');
const calendar = require('../controllers/calendar.server.controller');
const addtask = require('../controllers/addtask.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Mount the 'index' controller's 'render' method
    app.route('/').get(index.render);
    app.route('/dashboard').get(dashboard.render);
    app.route('/dashboard').post(dashboard.render);
    app.route('/calendar').get(calendar.render);
    app.route('/calendar').post(calendar.render);
    app.route('/addtask').get(addtask.render);
    app.route('/addtask').post(addtask.render);

};