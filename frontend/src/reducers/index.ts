import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk";
import { ADD_TASK, DELETE_TASK, EDIT_TASK_TITLE, FETCH_TASKS_OK, TaskActions, SET_TASK_COMPLETION } from "../actions";
import { Task } from "../models";

function tasksReducer(tasks: Task[] = [], action: TaskActions): Task[] {
    switch (action.type) {
        case ADD_TASK:
            let new_task = { _id: "", title: action.title, completed: false };
            return [...tasks, new_task];

        case SET_TASK_COMPLETION:
            return tasks.map((task) => {
                if (task._id === action._id) {
                    return { ...task, completed: action.completed };
                } else {
                    return task;
                }
            });

        case EDIT_TASK_TITLE:
            return tasks.map((task) => {
                if (task._id === action._id) {
                    return { ...task, title: action.new_title };
                } else {
                    return task;
                }
            });

        case DELETE_TASK:
            return tasks.filter((task) => task._id !== action._id);

        case FETCH_TASKS_OK:
            return action.tasks;

        default:
            return tasks;
    }
}

export default createStore (
    tasksReducer,
    applyMiddleware(thunk)
);
