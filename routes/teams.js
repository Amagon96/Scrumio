const teamsController = require('../controllers/teamsController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.post('/teams/:project_id', securityMiddleware.isLoggedIn, teamsController.create);

  app.delete('/teams/:id', securityMiddleware.isLoggedIn, teamsController.remove);

}
