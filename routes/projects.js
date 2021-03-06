const projectsControllers = require('../controllers/projectsController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

  app.get('/projects/:project_id', securityMiddleware.isLoggedIn, projectsControllers.index);
  app.get('/home_projects', securityMiddleware.isLoggedIn, projectsControllers.home);
  app.get('/dashboard_project/:id', securityMiddleware.isLoggedIn, projectsControllers.dashboard_project);
  app.get('/projects/:id', securityMiddleware.isLoggedIn, projectsControllers.findByOne);
  app.post('/projects', securityMiddleware.isLoggedIn, projectsControllers.create);
  app.put('/projects/:id', securityMiddleware.isLoggedIn, projectsControllers.update);
  app.delete('/projects/:id', securityMiddleware.isLoggedIn, projectsControllers.remove);

}
