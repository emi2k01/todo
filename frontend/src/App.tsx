import './App.css';
import NewTask from './components/NewTask';
import TasksList from './components/TasksList';

function App() {
    return (
        <div className="App">
            <NewTask />
            <TasksList />
        </div>
    );
}

export default App;
