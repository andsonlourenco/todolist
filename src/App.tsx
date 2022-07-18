import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "./components/Header";
import { PlusCircle, ClipboardText } from "phosphor-react";

import styles from "./App.module.css";

import "./global.css";
import { TaskList } from "./components/TaskList";

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskCount, setTaskCount] = useState(tasks.length);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const createNewTask = {
      id: uuidv4(),
      content: newTask,
      isCompleted: false,
    };

    setTasks([...tasks, createNewTask]);

    setTaskCount((stage) => {
      return stage + 1;
    });

    setNewTask("");

    console.log(tasks);
  }

  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatorio!");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  console.log(tasks);

  function handleTaskCompleted(id: string) {
    // const taskCompleted = tasks.map((task) =>
    //   task.id === id ? (task.isCompleted = !task.isCompleted) : task
    // );

    const taskCompleted = tasks.map((task) => {
      return task.id === id ? (task.isCompleted = !task.isCompleted) : task;
    });

    console.log(taskCompleted);

    setTasks(taskCompleted);
  }

  function handleRemoveTask(id: string) {
    const removeTask = tasks.filter((task) => task.id !== id);

    setTasks(removeTask);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <form className={styles.createTask} onSubmit={handleCreateNewTask}>
          <input
            name="newTask"
            onChange={handleNewTaskChange}
            type="text"
            value={newTask}
            placeholder="Adicione uma nova tarefa"
            onInvalid={handleTaskInvalid}
            required
          />
          <button>
            Criar <PlusCircle size={16} />
          </button>
        </form>

        <div className={styles.tasksInfo}>
          <div className={styles.tasksCreated}>
            <span>Tarefas criadas</span> <span>{taskCount}</span>
          </div>

          <div className={styles.tasksCompleted}>
            <span>concluidas</span> <span>0</span>
          </div>
        </div>

        <div className={styles.taskEmptyList}>
          <ClipboardText size={56} />
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>

        <div>
          <TaskList
            tasks={tasks}
            handleRemoveTask={handleRemoveTask}
            handleTaskCompleted={handleTaskCompleted}
          />
        </div>
      </main>
    </>
  );
}

export default App;
