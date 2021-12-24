import { createStore } from "redux"
import { ADD_TASK, DELETE_TASK, EDIT_TASK_TITLE, TaskActions, TOGGLE_TASK_COMPLETION } from "../actions";
import { Task } from "../models";

let NEXT_TASK_ID = 0;

function tasksReducer(tasks: Task[] = [], action: TaskActions): Task[] {
    switch (action.type) {
        case ADD_TASK:
            let new_task = { id: NEXT_TASK_ID, title: action.title, completed: false };
            NEXT_TASK_ID += 1;
            return [...tasks, new_task];

        case TOGGLE_TASK_COMPLETION:
            return tasks.map((task) => {
                if (task.id === action.id) {
                    return { ...task, completed: !task.completed };
                } else {
                    return task;
                }
            });

        case EDIT_TASK_TITLE:
            return tasks.map((task) => {
                if (task.id === action.id) {
                    return { ...task, title: action.new_title };
                } else {
                    return task;
                }
            });

        case DELETE_TASK:
            return tasks.filter((task) => task.id !== action.id);

        default:
            return tasks;
    }
}

export default createStore(tasksReducer);
