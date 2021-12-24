import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTaskTitle } from '../actions';
import { Task } from '../models'
import TaskActions from './TaskActions';

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
        dispatch(editTaskTitle(task.id, editedTitle));
        setIsEditing(false);
    };

    const handleTitleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setEditedTitle(e.currentTarget.value);
    };

    let titleView;
    if (isEditing) {
        titleView = (
            <form onSubmit={handleFormSubmit}>
                <input defaultValue={task.title} onInput={handleTitleInput} />
            </form>
        );
    } else {
        titleView = <div>{task.title}</div>;
    }

    return (
        <>
            {titleView}
            <TaskActions task={task} onTaskEdit={handleTaskEdit}/>
        </>
    );
}

export default TaskView;
