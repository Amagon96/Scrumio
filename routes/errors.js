const errorsController = require('../controllers/errorsController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.get('/errors/', errorsController.index);

}
