var emailController = require('../controllers/emailController');

module.exports = function(app, passport) {

  app.post('/email/:email/project/:project_id', emailController.sendEmail);

};
