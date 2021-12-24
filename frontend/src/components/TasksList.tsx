import { connect } from "react-redux";
import { Task } from "../models";
import TaskView from "./TaskView";

const mapStateToProps = (state: Task[]) => ({
    tasks: state,
});

export interface TasksListProps {
    tasks: Task[],
}

function TasksList(props: TasksListProps) {
    let { tasks } = props;

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}><TaskView task={task} /></li>
                ))}
            </ul>
        </div>
    );
}

export default connect(mapStateToProps)(TasksList);
