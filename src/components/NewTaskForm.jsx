import {useState} from 'react';
import PropTypes from 'prop-types';

const kDefaultFormState = {
  title: '',
  description: '',
};

const NewTaskForm = ({onPostNewTask}) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleSubmit = (event) => {
    event.preventDefault();

    onPostNewTask(formData);
    setFormData(kDefaultFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const makeControlledInput = (inputTitle) => {
    return <input
      onChange={handleChange}
      type='text'
      id={`input-${inputTitle}`}
      name={inputTitle}
      value={formData[inputTitle]}
    />;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor='input-title'>Task Title: </label>
          { makeControlledInput('title')}
        </div>
        <div>
          <label htmlFor='input-description'>Description: </label>
          {makeControlledInput('description') }
        </div>
      </div>
      <div>
        <button className='form-button'>Add New Task</button>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onPostNewTask: PropTypes.func.isRequired
};

export default NewTaskForm;