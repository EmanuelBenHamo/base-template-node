const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { addTask, getTasks, getTask, updateTask, deleteTask } = require('./task.controller');
const router = express.Router();

router.post('/', requireAuth, addTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', requireAuth, updateTask);
router.delete('/:id', requireAuth, requireAdmin, deleteTask);

module.exports = router