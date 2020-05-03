const taskService = require('./task.service');

async function addTask(req, res) {
    try {
        const task = req.body;
        const addedTask = await taskService.add(task);
        res.send(addedTask);
    } catch (error) {
        logger.error('Cannot add task', error);
        res.status(500).send({ error: 'Cannot add task' });
    }
}

async function getTasks(req, res) {
    try {
        const filterBy = req.query;
        const tasks = await taskService.query(filterBy);
        res.send(tasks);
    } catch (error) {
        logger.error('Cannot get tasks', error);
        res.status(500).send({ error: 'Cannot get tasks' });
    }
}

async function getTask(req, res) {
    try {
        const taskId = req.params.id;
        const task = await taskService.getById(taskId);
        res.send(task);
    } catch (error) {
        logger.error('Cannot get task', error);
        res.status(500).send({ error: 'Cannot get task' });
    }
}

async function updateTask(req, res) {
    try {
        const task = req.body;
        const updatedTask = await taskService.update(task);
        res.send(updatedTask);
    } catch (error) {
        logger.error('Cannot update task', error);
        res.status(500).send({ error: 'Cannot update task' });
    }
}

async function removeTask(req, res) {
    try {
        const taskId = req.params.id;
        await taskService.remove(taskId);
        res.end();
    } catch (error) {
        logger.error('Cannot remove task', error);
        res.status(500).send({ error: 'Cannot remove task' });
    }
}

module.exports = {
    addTask,
    getTasks,
    getTask,
    updateTask,
    removeTask
}