import { useDispatch } from "react-redux";
import { deleteTask, setTaskCompletion } from "../actions";
import { Task } from "../models";
import "./TaskActions.css";

export interface TaskActionsProps {
    task: Task,
    onTaskEdit: (taskId: string) => void,
}

function TaskActions({task, onTaskEdit}: TaskActionsProps) {
    const dispatch = useDispatch();

    const handleEdit= () => {
        onTaskEdit(task._id);
    };

    const handleToggle = () => {
        dispatch(setTaskCompletion(task._id, !task.completed));
    };

    const handleDelete = () => {
        dispatch(deleteTask(task._id));
    }

    return (
        <div className="task-actions">
            <button onClick={handleEdit}><EditSvg /></button>
            <button className={task.completed ? "completed" : "uncompleted"} onClick={handleToggle}><CheckSvg /></button>
            <button onClick={handleDelete}><DeleteSvg /></button>
        </div>
    );
}

function EditSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="feather
        feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0
        0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1
        1-4 9.5-9.5z"></path></svg>
    );
}

function CheckSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0
        24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="feather
        feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
    );
}

function DeleteSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0
        24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="feather
        feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19
        6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2
        2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14"
        y1="11" x2="14" y2="17"></line></svg>
    );
}

export default TaskActions;
