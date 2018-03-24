// Create a new 'render' controller method
exports.render = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
    // let username = req.body.Username;
    // req.session.username = username;
    let course = 'all';
    if(req.query.course) {
	    course = req.query.course;
    }
    let tasks = require('../../data/tasks').Tasks;

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();

	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('dashboard', {
		title: 'Dashboard Page',
        course: course,
        tasks: tasks
	});
};