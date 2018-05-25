var EmailCtrl = require('../controllers/mailCtrl');
//email route
router.post('/email', isLoggedIn, EmailCtrl.sendEmail);

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
