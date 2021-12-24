export const ADD_TASK = "ADD_TASK";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const EDIT_TASK_TITLE = "EDIT_TASK_TITLE";
export const DELETE_TASK = "DELETE_TASK";

export interface AddTaskAction {
    type: typeof ADD_TASK,
    title: string,
}

export interface ToggleTaskCompletionAction {
    type: typeof TOGGLE_TASK_COMPLETION,
    id: number,
}

export interface EditTaskTitleAction {
    type: typeof EDIT_TASK_TITLE,
    id: number,
    new_title: string,
}

export interface DeleteTaskAction {
    type: typeof DELETE_TASK,
    id: number,
}

export type TaskActions =
    AddTaskAction
    | ToggleTaskCompletionAction
    | EditTaskTitleAction
    | DeleteTaskAction;

export function addTask(title: string): TaskActions {
    return {
        type: ADD_TASK,
        title: title,
    }
}

export function toggleTaskCompletion(id: number): TaskActions {
    return {
        type: TOGGLE_TASK_COMPLETION,
        id: id,
    }
}

export function editTaskTitle(id: number, new_title: string): TaskActions {
    return {
        type: EDIT_TASK_TITLE,
        id: id,
        new_title: new_title,
    }
}

export function deleteTask(id: number): TaskActions {
    return {
        type: DELETE_TASK,
        id: id,
    }
}
