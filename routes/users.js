const usersController = require('../controllers/usersController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.get('/profile/:project_id?', securityMiddleware.isLoggedIn, usersController.index);

  app.put('/users/:id', securityMiddleware.isLoggedIn, usersController.update)

}
