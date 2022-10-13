import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import plus from '../../assets/plus-circle.svg';

// Types
type FormProps = {
  addTask: (newTask: string) => void;
};

// Logic
export const Form = ({ addTask }: FormProps) => {
  const [newTask, setNewTask] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          value={newTask}
          onChange={handleChange}
          type='text'
          name='new task'
          placeholder='Add a new task'
        />
        <button type='submit' className={styles.button}>
          <img src={plus} alt='add' className={styles.icon} />
        </button>
      </div>
    </form>
  );
};
