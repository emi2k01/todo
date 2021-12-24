import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const DB = "todo-app";
const TASKS_COLLECTION = "tasks";

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function getTasks(_request: express.Request, response: express.Response) {
    let tasks = await client
        .db(DB)
        .collection(TASKS_COLLECTION)
        .find({})
        .toArray();

    response.json(tasks);
}

async function addTask(request: express.Request, response: express.Response) {
    await client.db(DB).collection(TASKS_COLLECTION).insertOne({
        title: request.body.title,
        completed: false,
    });
    // 201 Created
    response.sendStatus(201);
}

async function editTask(request: express.Request, response: express.Response) {
    let filter = { _id: new ObjectId(request.params.id)};

    let updateQuery = {
        $set: request.body,
    };

    let result = await client
        .db(DB)
        .collection(TASKS_COLLECTION)
        .updateOne(filter, updateQuery);

    if (result.modifiedCount === 1) {
        // 200 Ok
        response.sendStatus(200);
    } else {
        // 404 Not Found
        response.sendStatus(404);
    }
}

async function deleteTask(request: express.Request, response: express.Response) {
    let query = { _id: new ObjectId(request.params.id) };
    let result = await client
        .db(DB)
        .collection(TASKS_COLLECTION)
        .deleteOne(query);

    if (result.deletedCount === 1) {
        // 200 Ok
        response.sendStatus(200);
    } else {
        // 404 Not Found
        response.sendStatus(404);
    }
}

function cleanup() {
    client.close();
    process.exit(0);
}

async function main() {
    const PORT = 8080;

    await client.connect();
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);

    const app = express();
    app.use(express.json());

    app.get('/tasks', getTasks);
    app.post('/tasks', addTask);
    app.put('/tasks/:id', editTask);
    app.delete('/tasks/:id', deleteTask);

    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
}

main();
