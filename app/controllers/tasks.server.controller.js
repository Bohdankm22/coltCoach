const mongoose = require('mongoose');
const Task = mongoose.model('Task');
//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const task = new Task(req.body);
    task.creator = req.user;
    task.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // res.status(200).json(task);
            res.redirect('/dashboard');
        }
    });
};
//
exports.list = function (req, res) {
    // Task.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, tasks) => {
    Task.find().exec((err, tasks) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(tasks);
        }
    });
};
//
exports.taskByCode = function (req, res, next, id) {
    Task.findById(id).populate('creator', 'firstName lastName fullName').exec((err, task) => {if (err) return next(err);
        if (!task) return next(new Error('Failed to load task '
            + id));
        req.task = task;
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.task);
};
//
exports.update = function (req, res) {
    const task = req.task;
    task.taskCode = req.body.taskCode;
    task.taskName = req.body.taskName;
    //TODO UPDATE
    task.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(task);
        }
    });
};
//
exports.delete = function (req, res) {
    const task = req.task;
    task.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(task);
        }
    });
};
//The hasAuthorization() middleware uses the req.task and req.user objects
//to verify that the current user is the creator of the current task
exports.hasAuthorization = function (req, res, next) {
    if (req.task.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};


