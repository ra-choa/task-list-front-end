import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const toggleComplete = (taskId) => {
    const tasks = taskData.map(task => {
      if (task.id === taskId) {
        return { ...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
    });
    setTaskData(tasks);
    console.log('updated states', tasks);
  };
    // function to delete all task data
  const deleteAllTasks = () => {
    setTaskData([]);
  };

  const deleteTaskById = (taskId) => {
    const remainingTasks = taskData.filter(task => task.id !== taskId);
    setTaskData(remainingTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onClickCompleteToggle={toggleComplete}
            onClickDeleteAll={deleteAllTasks}
            onClickDeleteTask={deleteTaskById}/>
        </div>
      </main>
    </div>
  );
};

export default App;
