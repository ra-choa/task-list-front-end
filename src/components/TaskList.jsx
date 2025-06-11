import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

// 
const TaskList = ({ tasks }) => { 
  const getTaskListJSX = (tasks) => { 
    // get array of JSX items
    // iterates over each task in tasks; passes into 
    return tasks.map((task) => { 
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList;
