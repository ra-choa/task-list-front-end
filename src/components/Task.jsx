import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onClickCompleteToggle, onClickDeleteTask }) => {
  const markComplete = () => {
    onClickCompleteToggle(id);
  };

  const deleteTask = () => {
    onClickDeleteTask(id);
  };

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={markComplete}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteTask}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onClickCompleteToggle: PropTypes.func,
  onClickDeleteTask: PropTypes.func.isRequired,
};

export default Task;
