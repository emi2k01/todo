import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTaskTitle } from '../actions';
import { Task } from '../models'
import TaskActions from './TaskActions';
import "./TaskView.css";

export interface TaskViewProps {
    task: Task,
}

function TaskView({ task }: TaskViewProps) {
    const [editedTitle, setEditedTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const handleTaskEdit = () => {
        setIsEditing(true);
    };

    const handleFormSubmit = (_e: React.FormEvent<HTMLFormElement>) => {
        dispatch(editTaskTitle(task._id, editedTitle));
        setIsEditing(false);
    };

    const handleTitleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setEditedTitle(e.currentTarget.value);
    };

    const handleOnBlur = (e: React.FormEvent<HTMLInputElement>) => {
        setIsEditing(false);
    };

    let titleView;
    if (isEditing) {
        titleView = (
            <form onSubmit={handleFormSubmit}>
                <input autoFocus defaultValue={task.title} onInput={handleTitleInput} onBlur={handleOnBlur}/>
            </form>
        );
    } else {
        titleView = <div className={task.completed ? "completed" : "uncompleted"}>{task.title}</div>;
    }

    return (
        <div className="task-view">
            {titleView}
            <TaskActions task={task} onTaskEdit={handleTaskEdit}/>
        </div>
    );
}

export default TaskView;
