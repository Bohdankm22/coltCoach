/**
Copyright (c) 2018
Authors: Bohdan Sharipov, Alexey Ulianov, Eskender Memetov, John Calma
 */

// Create a new 'render' controller method
exports.render = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();

	//TODO
    let username = require('../../data/user').studentName;

	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('addtask', {
		title: 'Add Task',
        username: username
	});
};