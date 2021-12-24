import { Task } from "../models";

export const ADD_TASK = "ADD_TASK";
export const SET_TASK_COMPLETION = "SET_TASK_COMPLETION";
export const EDIT_TASK_TITLE = "EDIT_TASK_TITLE";
export const DELETE_TASK = "DELETE_TASK";
export const FETCH_TASKS_OK = "FETCH_TASKS_OK";

export interface AddTaskAction {
    type: typeof ADD_TASK,
    title: string,
}

export interface SetTaskCompletion {
    type: typeof SET_TASK_COMPLETION,
    _id: string,
    completed: boolean,
}

export interface EditTaskTitleAction {
    type: typeof EDIT_TASK_TITLE,
    _id: string,
    new_title: string,
}

export interface DeleteTaskAction {
    type: typeof DELETE_TASK,
    _id: string,
}

export interface FetchTasksOk {
    type: typeof FETCH_TASKS_OK,
    tasks: Task[],
}

export type TaskActions =
    AddTaskAction
    | SetTaskCompletion
    | EditTaskTitleAction
    | DeleteTaskAction
    | FetchTasksOk;

type DispatchFn = (action: TaskActions) => void;

export function addTask(title: string) {
    return async (dispatch: DispatchFn) => {
        // add new task on client-side
        dispatch({
            type: ADD_TASK,
            title: title,
        });

        await fetch("/tasks", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title }),
        });

        // sync with server
        fetchTasks()(dispatch);
    }
}

export function setTaskCompletion(_id: string, completed: boolean) {
    return async (dispatch: DispatchFn) => {
        dispatch({
            type: SET_TASK_COMPLETION,
            _id: _id,
            completed: completed,
        })

        try {
            await fetch(`/tasks/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: completed}),
            });
        } catch(error: any) {
            console.error(error);
        };
    };
}

export function editTaskTitle(_id: string, new_title: string) {
    return async (dispatch: DispatchFn) => {
        dispatch({
            type: EDIT_TASK_TITLE,
            _id: _id,
            new_title: new_title,
        });

        try {
            await fetch(`/tasks/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: new_title}),
            });
        } catch(error: any) {
            console.error(error);
        };
    }
}

export function deleteTask(_id: string) {
    return async (dispatch: DispatchFn) => {
        dispatch({
            type: DELETE_TASK,
            _id: _id,
        });

        try {
            await fetch(`/tasks/${_id}`, {
                method: "DELETE",
            });
        } catch(error: any) {
            console.error(error);
        };
    }
}

function fetchTasksOk(tasks: Task[]): TaskActions {
    return {
        type: FETCH_TASKS_OK,
        tasks: tasks,
    }
}

export function fetchTasks() {
    return async (dispatch: any) => {
        //TODO: Add loading state ¿?¿?
        const response = await fetch("/tasks");
        const data = await response.json();
        dispatch(fetchTasksOk(data));
    }
}
