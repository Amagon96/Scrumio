const tasksController = require('../controllers/tasksController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

    app.get('/tasks/:page?', securityMiddleware.isLoggedIn, tasksController.showAll);

}