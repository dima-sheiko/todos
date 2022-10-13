import { useLocalStorage } from './hooks/useLocalStorage';
import { Form } from './components/Form/Form';
import { List } from './components/List/List';
import { v4 as uuidv4 } from 'uuid';
import './styles/styles.css';

// Types
export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

// Logic
export const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  // Handlers
  const addTask = (newTask: string) => {
    if (newTask !== '') {
      setTasks([...tasks, { id: uuidv4(), text: newTask, isCompleted: false }]);
    }
  };

  const removeTask = (task: Task) => {
    const deletedTask = tasks.filter((el) => task.id !== el.id);
    setTasks(deletedTask);
  };

  const editTask = (id: string, newText: string) => {
    const updatedTask = [...tasks].map((el) => {
      if (el.id === id) {
        el.text = newText;
      }
      return el;
    });
    setTasks(updatedTask);
  };

  const toggleComplete = (task: Task) => {
    const updatedTask = tasks.map((el) => {
      if (el === task) return { ...el, isCompleted: !el.isCompleted };
      return el;
    });
    setTasks(updatedTask);
  };

  return (
    <div className='container'>
      <h1>todos</h1>
      <Form addTask={addTask} />
      <List
        tasks={tasks}
        toggleComplete={toggleComplete}
        removeTask={removeTask}
        editTask={editTask}
      />
    </div>
  );
};
