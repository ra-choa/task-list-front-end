import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getTaskListApi = () => {
  return axios.get(`${baseUrl}/tasks`)
    .then( response => {
      return response.data.map(convertFromApi);
    })
    .catch( error => {
      console.log(error);
    });
};

const postTaskApi = (taskData) => {
  return axios.post(`${baseUrl}/tasks`, taskData)
    .then (response => {
      const newTask = response.data.task;
      const completedAt = newTask.completed_at || null; //need to define it ahead of time to use it for isComplete
      return {
        id: newTask.id,
        title: newTask.title,
        isComplete: completedAt !==null
      };
    });
};

const convertFromApi = (task) => {
  const { id, title, completedAt = null } = task;
  const isComplete = completedAt !== null;
  const newTask = { id, title, completedAt, isComplete };
  return newTask;
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  // Get tasks from db
  const getAllTasks = () => {
    return getTaskListApi()
      .then(tasks => setTaskData(tasks));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleComplete = (taskId, isComplete) => {
    const endpoint = isComplete
      ? `${baseUrl}/tasks/${taskId}/mark_incomplete`
      : `${baseUrl}/tasks/${taskId}/mark_complete`;

    axios.patch(endpoint)
      .then(() => {
        setTaskData(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? {...task, isComplete: !isComplete} : task
          )
        );
      })
      .catch(error => console.log(error));
  };

  const deleteTaskById = (taskId) => {
    axios.delete(`${baseUrl}/tasks/${taskId}`)
      .then(() => {
        setTaskData(prevTasks =>
          prevTasks.filter(task => task.id !== taskId)
        );
      })
      .catch(error => console.log(error));
  };

  const postNewTask = (newTaskData) => {
    postTaskApi(newTaskData)
      .then(newTask => {
        console.log('New task added:', newTask);
        setTaskData(prevTasks => [newTask, ...prevTasks]);
      })
      .catch(error => console.log(error));
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
            onClickDeleteTask={deleteTaskById}/>
        </div>
        <div>
          <NewTaskForm onPostNewTask={postNewTask}/>
        </div>
      </main>
    </div>
  );
};

export default App;
