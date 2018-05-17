const indexController = require('../controllers/indexController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

    app.get('/', securityMiddleware.isLog, indexController.index);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/dashboard/:id', securityMiddleware.isLoggedIn,
                              securityMiddleware.hasProyect,
                              indexController.dashboard);

    app.get('/dashboard/tab/:tab?', securityMiddleware.isLoggedIn, indexController.dashboard);

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', indexController.logout);

};
