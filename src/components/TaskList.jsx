import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = (props) => {
  const getTaskListJSX = () => {
    return props.tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onClickCompleteToggle={props.onClickCompleteToggle}
          onClickDeleteTask={props.onClickDeleteTask}
        />
      );
    });
  };
  return (
    <>
      <ul className='tasks__list no-bullet'>{getTaskListJSX()}</ul>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onClickCompleteToggle: PropTypes.func,
  onClickDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
