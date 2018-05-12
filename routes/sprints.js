const sprintsController = require('../controllers/sprintsController');
const express = require('express');
const router = express.Router();

router.get('/:id', sprintsController.findOne);

router.get('/:page?', sprintsController.showAll);

router.post('/', sprintsController.create);

router.put('/:id', sprintsController.update);

router.delete('/:id', sprintsController.remove);

module.exports = router;