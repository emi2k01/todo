import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchTasks } from "../actions";
import { Task } from "../models";
import TaskView from "./TaskView";
import "./TaskList.css"

const mapStateToProps = (state: Task[]) => ({
    tasks: state,
});

export interface TasksListProps {
    tasks: Task[],
}

function TasksList(props: TasksListProps) {
    let { tasks } = props;
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    return (
        <ul className="tasks-list">
            {tasks.map((task) => (
                <li key={task._id}><TaskView task={task} /></li>
            ))}
        </ul>
    );
}

export default connect(mapStateToProps)(TasksList);
