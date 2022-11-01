import { useState, useEffect, useRef, FormEvent } from 'react';
import { Task } from '../../App';
import menu from '../../assets/more-vertical.svg';
import save from '../../assets/save.svg';
import styles from './Item.module.css';

// Types
type ItemProps = {
  task: Task;
  toggleComplete: (task: Task) => void;
  removeTask: (task: Task) => void;
  editTask: (id: string, newText: string) => void;
};

// Logic
export const Item = ({
  task,
  toggleComplete,
  removeTask,
  editTask,
}: ItemProps) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [newText, setNewText] = useState(task.text);

  // Ref
  const popRef = useRef<HTMLDivElement>(null);

  // Effect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popRef.current && !e.composedPath().includes(popRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  // Handlers

  const handleEdit = () => {
    setIsEdited(true);
    setIsOpen(false);
  };

  const submitEdit = (e: FormEvent) => {
    e.preventDefault();
    if (newText !== '') {
      editTask(task.id, newText);
      setIsEdited(false);
    }
  };

  const togglePopUp = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <li className={styles.item}>
      <div
        className={
          task.isCompleted ? `${styles.task} ${styles.completed}` : styles.task
        }
      >
        <input
          onChange={() => toggleComplete(task)}
          checked={task.isCompleted}
          type='checkbox'
        />
        {isEdited ? (
          <form onSubmit={submitEdit} className={styles.edit}>
            <textarea
              className={styles['edit-area']}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className={styles['save-btn']} type='submit'>
              <img src={save} alt="save editing" />
            </button>
          </form>
        ) : (
          <div className={styles.text}>{task.text}</div>
        )}
      </div>
      <div className={styles.menu} ref={popRef}>
        <button className={styles.menu_btn}>
          <img
          src={menu}
          className={styles.dots}
          onClick={togglePopUp}
          alt='menu'
        />
        </button>
        {isOpen && (
          <div className={styles.popup}>
            <ul>
              <li onClick={handleEdit}>Edit</li>
              <li onClick={() => removeTask(task)}>Remove</li>
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};
