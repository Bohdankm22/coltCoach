const users = require('../../app/controllers/users.server.controller');
const task = require('../../app/controllers/tasks.server.controller');
//
module.exports = function (app) {
        app.route('/api/tasks')
            .get(task.list)
            .post(users.requiresLogin, task.create);
        app.route('/api/tasks/:taskCode')
            .get(task.read)
            .put(users.requiresLogin, task.hasAuthorization, task.
                update)
            .delete(users.requiresLogin, task.hasAuthorization, task.
                delete);
        app.param('taskCode', task.taskByCode);
};
