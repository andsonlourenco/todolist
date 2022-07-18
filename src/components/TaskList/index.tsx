import { Check, Trash } from "phosphor-react";
import styles from "./styles.module.css";

export function TaskList({ tasks, handleRemoveTask, handleTaskCompleted }) {
  return (
    <div className={styles.taskList}>
      {tasks.map((task) => {
        return (
          <div key={task.id} className={styles.taskList}>
            <label className={styles.taskCompleted}>
              <input
                type="checkbox"
                readOnly
                checked={task.isCompleted}
                onClick={() => handleTaskCompleted(task.id)}
                value={task.content}
              />
              {/* {taskCompleted && <Check size={23} />} */}
              <span>{task.content}</span>
            </label>

            <button onClick={() => handleRemoveTask(task.id)}>
              <Trash size={24} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
