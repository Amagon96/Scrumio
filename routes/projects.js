const projectsControllers = require('../controllers/projectsController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.get('/projects', securityMiddleware.isLoggedIn, projectsControllers.index);
  app.post('/projects', securityMiddleware.isLoggedIn, projectsControllers.create);
  app.put('/projects/:id', securityMiddleware.isLoggedIn, projectsControllers.update);
  app.delete('/projects/:id', securityMiddleware.isLoggedIn, projectsControllers.remove);

}
