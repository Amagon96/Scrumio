const abilitiesController = require('../controllers/abilitiesController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.post('/abilities', securityMiddleware.isLoggedIn, abilitiesController.create);

  app.delete('/abilities/:id', securityMiddleware.isLoggedIn, abilitiesController.remove);

  app.put('/abilities/:id', securityMiddleware.isLoggedIn, abilitiesController.update);

}
