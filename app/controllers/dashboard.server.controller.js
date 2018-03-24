
// Create a new 'render' controller method
exports.render = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

    // Getting tasks from json file
    let tasks = require('../../data/tasks').Tasks;

	// Filter by course
    let course = 'all';
    if(req.query.course) {
        course = req.query.course;
        tasks = tasks.filter(task => task.CourseID.toLowerCase() === course.toLowerCase());
    }
    if(req.query.status) {
        status = req.query.status;
        tasks = tasks.filter(task => task.Folder.toLowerCase() === status.toLowerCase());
    }

    tasks.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.Deadline_date) - new Date(b.Deadline_date);
    });

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();

	let username = require('../../data/user').studentName;

	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('dashboard', {
		title: 'Dashboard Page',
        username: username,
        course: course,
        tasks: tasks
	});
};