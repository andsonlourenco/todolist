import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "./components/Header";
import { PlusCircle } from "phosphor-react";

import styles from "./App.module.css";

import "./global.css";
import { TaskList } from "./components/TaskList";
import { EmptyTaskList } from "./components/TaskList/emptyTaskList";

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const createNewTask = {
      id: uuidv4(),
      content: newTask,
      isCompleted: false,
    };

    setTasks([...tasks, createNewTask]);

    setNewTask("");
  }

  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatorio!");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleTaskToggle(id: string) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });

    const newTaskList = [...tasks];

    newTaskList[taskIndex].isCompleted = !newTaskList[taskIndex].isCompleted;

    setTasks(newTaskList);
  }

  function handleRemoveTask(id: string) {
    const removeTask = tasks.filter((task) => task.id !== id);

    setTasks(removeTask);
  }

  const taskCompleted = tasks.filter((task) => task.isCompleted);

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
            <span>Tarefas criadas</span>{" "}
            <span>{tasks.length !== 0 ? tasks.length : 0}</span>
          </div>

          <div className={styles.tasksCompleted}>
            <span>concluidas</span>{" "}
            <span>{`${taskCompleted.length} de ${tasks.length}`}</span>
          </div>
        </div>

        {tasks.length !== 0 ? (
          <TaskList
            tasks={tasks}
            handleRemoveTask={handleRemoveTask}
            handleTaskToggle={handleTaskToggle}
          />
        ) : (
          <EmptyTaskList />
        )}
      </main>
    </>
  );
}

export default App;
