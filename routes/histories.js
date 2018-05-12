const historiasController = require('../controllers/historiesController');

module.exports = function(app, passport) {
  app.post('/histories', isLoggedIn, historiasController.create);

  app.get('/histories/:page?', isLoggedIn, historiasController.index);

  app.get('/histories/show/:id', isLoggedIn, historiasController.show);

  app.put('/histories/:id', isLoggedIn, historiasController.update);

  app.delete('/histories/:id?', isLoggedIn, historiasController.remove);
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
