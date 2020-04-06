const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

const collectionName = 'task';

async function add(task) {
    const collection = await dbService.getCollection(collectionName);
    try {
        await collection.insertOne(task);
        return task;
    } catch (err) {
        console.log(`ERROR: cannot insert task`);
        throw err;
    }
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection(collectionName);
    try {
        let tasks = await collection.find(criteria).toArray();
        tasks.forEach(task => delete task.password);
        return tasks;
    } catch (err) {
        console.log('ERROR: cannot find tasks');
        throw err;
    }
}

async function getById(taskId) {
    const collection = await dbService.getCollection(collectionName);
    try {
        let task = await collection.findOne({ "_id": ObjectId(taskId) });
        delete task.password;
        return task;
    } catch (err) {
        console.log(`ERROR: while finding task ${taskId}`);
        throw err;
    }
}

async function update(task) {
    const collection = await dbService.getCollection(collectionName);
    task._id = ObjectId(task._id);
    try {
        await collection.replaceOne({ "_id": task._id }, { $set: task });
        return task;
    } catch (err) {
        console.log(`ERROR: cannot update task ${task._id}`);
        throw err;
    }
}

async function remove(taskId) {
    const collection = await dbService.getCollection(collectionName);
    try {
        await collection.deleteOne({ "_id": ObjectId(taskId) });
    } catch (err) {
        console.log(`ERROR: cannot remove task ${taskId}`);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    return criteria;
}