var EmailCtrl = require('../controllers/mailCtrl');
//email route
router.post('/email/:email', EmailCtrl.sendEmail);

