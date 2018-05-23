const sprintsController = require('../controllers/sprintsController');
const tasksController = require('../controllers/tasksController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

app.get('/sprints/:id', securityMiddleware.isLoggedIn, sprintsController.findOne);

app.get('/sprints/:page?', securityMiddleware.isLoggedIn, sprintsController.showAll);

app.post('/sprints/:project_id', securityMiddleware.isLoggedIn, sprintsController.create);

app.put('/sprints/:id', securityMiddleware.isLoggedIn, sprintsController.update);

app.delete('/sprints/:id', securityMiddleware.isLoggedIn, sprintsController.remove);


app.get('/sprints/:id/tasks/', securityMiddleware.isLoggedIn, tasksController.showSprintTasks);

app.get('/sprints/:id/tasks/:idTask', securityMiddleware.isLoggedIn, tasksController.findOne);

app.post('/sprints/:id/tasks/', securityMiddleware.isLoggedIn, tasksController.create);

app.delete('/sprints/:id/tasks/:idTask', securityMiddleware.isLoggedIn, tasksController.remove);

}
