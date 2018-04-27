/**
 Copyright (c) 2018
 Authors: Bohdan Sharipov, Alexey Ulianov, Eskender Memetov, John Calma
 */
const http = require('http');
const url = require('url');
// Create a new 'render' controller method
exports.render = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

    // Getting tasks from json file
    let tasks = require('../../data/tasks').Tasks;

    let options = {
        host: 'localhost',
        port: 3000,
        path: '/api/tasks',
        method: 'GET'
    };
    let rawTasks = http.request(options, function(res) {
        let rawTasks = {};
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            rawTasks = chunk;
            console.log(rawTasks);
            console.log('BODY: ' + chunk);
            return rawTasks;
        });
    }).end();
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
    console.log(rawTasks);
	let username = require('../../data/user').studentName;

    // Use the 'response' object to render the 'index' view with a 'title' property
	res.render('dashboard', {
		title: 'Dashboard Page',
        username: username,
        course: course,
        tasks: tasks,

	});

};