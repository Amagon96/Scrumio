const tasksController = require('../controllers/tasksController');
const express = require('express');
const router = express.Router();

router.get('/:id', tasksController.findOne);

router.get('/:page?', tasksController.showAll);

router.post('/', tasksController.create);

//router.put('/:id', tasksController.update);

//router.delete('/:id', tasksController.remove);

module.exports = router;