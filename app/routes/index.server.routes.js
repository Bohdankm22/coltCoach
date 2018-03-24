// Load the 'index' controller
const index = require('../controllers/index.server.controller');
const dashboard = require('../controllers/dashboard.server.controller');
const calendar = require('../controllers/calendar.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Mount the 'index' controller's 'render' method
    app.route('/').get(index.render);
    app.route('/dashboard').get(dashboard.render);
    app.route('/calendar').get(calendar.render);

};