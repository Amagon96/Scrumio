const membersController = require('../controllers/membersController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.post('/members', securityMiddleware.isLoggedIn, membersController.create);

  app.delete('/members/:id', securityMiddleware.isLoggedIn, membersController.remove);

}
