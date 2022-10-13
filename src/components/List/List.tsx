import { Task } from '../../App';
import { Item } from '../Item/Item';
import done from '../../assets/done.svg';
import styles from './List.module.css';

// Types
type ListProps = {
  tasks: Task[];
  toggleComplete: (task: Task) => void;
  removeTask: (task: Task) => void;
  editTask: (id: string, newText: string) => void;
};

// Logic
export const List = ({
  tasks,
  toggleComplete,
  removeTask,
  editTask,
}: ListProps) => {
  return (
    <>
      {tasks.length === 0 && (
        <div className={styles.empty}>
          <img src={done} alt='no tasks at the moment' />{' '}
          <p>You've done all the tasks!</p>
        </div>
      )}
      <ul className={styles.list}>
        {tasks.map((task) => (
          <Item
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </>
  );
};
