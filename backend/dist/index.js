"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const DB = "todo-app";
const TASKS_COLLECTION = "tasks";
const client = new mongodb_1.MongoClient("mongodb://127.0.0.1:27017");
function getTasks(_request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = yield client
            .db(DB)
            .collection(TASKS_COLLECTION)
            .find({})
            .toArray();
        response.json(tasks);
    });
}
function addTask(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.db(DB).collection(TASKS_COLLECTION).insertOne({
            title: request.body.title,
            completed: false,
        });
        // 201 Created
        response.sendStatus(201);
    });
}
function editTask(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = { _id: new mongodb_1.ObjectId(request.params.id) };
        let updateQuery = {
            $set: request.body,
        };
        let result = yield client
            .db(DB)
            .collection(TASKS_COLLECTION)
            .updateOne(filter, updateQuery);
        if (result.modifiedCount === 1) {
            // 200 Ok
            response.sendStatus(200);
        }
        else {
            // 404 Not Found
            response.sendStatus(404);
        }
    });
}
function deleteTask(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = { _id: new mongodb_1.ObjectId(request.params.id) };
        let result = yield client
            .db(DB)
            .collection(TASKS_COLLECTION)
            .deleteOne(query);
        if (result.deletedCount === 1) {
            // 200 Ok
            response.sendStatus(200);
        }
        else {
            // 404 Not Found
            response.sendStatus(404);
        }
    });
}
function cleanup() {
    client.close();
    process.exit(0);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = 8080;
        yield client.connect();
        process.on("SIGINT", cleanup);
        process.on("SIGTERM", cleanup);
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.get('/tasks', getTasks);
        app.post('/tasks', addTask);
        app.put('/tasks/:id', editTask);
        app.delete('/tasks/:id', deleteTask);
        app.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        });
    });
}
main();
