import { Trash } from "phosphor-react";
import styles from "./styles.module.css";

interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  handleRemoveTask: (id: string) => void;
  handleTaskToggle: (id: string) => void;
}

export function TaskList({
  tasks,
  handleRemoveTask,
  handleTaskToggle,
}: TaskListProps) {
  return (
    <div className={styles.taskList}>
      {tasks.map(({ id, content, isCompleted }) => {
        return (
          <div key={Math.random()} className={styles.taskListItem}>
            <label className={styles.taskCompleted}>
              <input
                type="checkbox"
                readOnly
                checked={isCompleted}
                onClick={() => handleTaskToggle(id)}
              />
            </label>
            <span
              className={
                isCompleted === true ? styles.taskListItemCompleted : ""
              }
            >
              {content}
            </span>

            <button onClick={() => handleRemoveTask(id)}>
              <Trash size={24} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
