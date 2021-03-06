const indexController = require('../controllers/indexController');
const securityMiddleware = require('../middlewares/securityMiddleware');

module.exports = function(app, passport) {

    app.get('/', securityMiddleware.isLog, indexController.index);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home_projects', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/dashboard/:id', securityMiddleware.isLoggedIn,
                              securityMiddleware.hasProyect,
                              indexController.dashboard);

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home_projects', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/home_projects',
            failureRedirect : '/'
        }));

    app.get('/connect/facebook', passport.authorize('facebook', {
         scope : ['public_profile', 'email']
       }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
       passport.authorize('facebook', {
           successRedirect : '/home_projects',
           failureRedirect : '/'
       }));

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
           passport.authenticate('google', {
                   successRedirect : '/home_projects',
                   failureRedirect : '/'
           }));

    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    app.get('/connect/google/callback',
       passport.authorize('google', {
           successRedirect : '/home_projects',
           failureRedirect : '/'
       }));
    app.get('/logout', indexController.logout);

};
