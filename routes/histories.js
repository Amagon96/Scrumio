const historiasController = require('../controllers/historiesController');

module.exports = function(app, passport) {
  app.post('/histories/:project_id', isLoggedIn, historiasController.create);

  app.post('/histories/update_time/:history_id/:project_id', isLoggedIn, historiasController.update_time);

  app.get('/histories/:page?', isLoggedIn, historiasController.index);

  app.get('/histories/show/:id', isLoggedIn, historiasController.show);

  app.put('/histories/:id', isLoggedIn, historiasController.update);

  app.put('/histories/:history_id/sprints/:sprint_id', isLoggedIn, historiasController.update_sprint);

  app.put('/histories/update_state/:id', isLoggedIn, historiasController.update_state);

  app.delete('/histories/:id?', isLoggedIn, historiasController.remove);

  app.delete('/histories/:history_id/sprints/', isLoggedIn, historiasController.remove_sprint);
}

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.render('index', {
    title: "Home",
    message: "Necesita logearse primero."
  });
}
