const sprintsController = require('../controllers/sprintsController');
const tasksController = require('../controllers/tasksController');

const express = require('express');
const router = express.Router();

router.get('/:id', sprintsController.findOne);

router.get('/:page?', sprintsController.showAll);

router.post('/', sprintsController.create);

router.put('/:id', sprintsController.update);

router.delete('/:id', sprintsController.remove);


router.get('/:id/tasks/', tasksController.showSprintTasks);

router.get('/:id/tasks/:idTask', tasksController.findOne);

router.post('/:id/tasks/', tasksController.create);

router.delete('/:id/tasks/:idTask', tasksController.remove);

module.exports = router;

//app.use('/sprints/:idSprint/tasks', tasks);