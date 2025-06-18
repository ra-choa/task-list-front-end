import PropTypes from "prop-types";
import Task from "./Task.jsx";
import "./TaskList.css";

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
      <button
        className='delete__all__tasks button'
        onClick={props.onClickDeleteAll}
      >
        Click HERE to Delete All Tasks!
      </button>
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
  onClickDeleteAll: PropTypes.func.isRequired,
  onClickDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
