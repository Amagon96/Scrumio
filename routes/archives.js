const archiveController = require('../controllers/archiveController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {
  app.delete('/archives/:id', securityMiddleware.isLoggedIn, archiveController.remove);
}
