import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../actions";
import { Task } from "../models";

export interface TaskActionsProps {
    task: Task,
    onTaskEdit: (taskId: number) => void,
}

function TaskActions({task, onTaskEdit}: TaskActionsProps) {
    const dispatch = useDispatch();

    const handleEdit= () => {
        onTaskEdit(task.id);
    };

    const handleToggle = () => {
        dispatch(toggleTaskCompletion(task.id));
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    }

    return (
        <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleToggle}>Mark as {task.completed ? "uncompleted" : "completed"}</button>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
}

export default TaskActions;
