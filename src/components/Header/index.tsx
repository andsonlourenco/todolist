import styles from "./styles.module.css";

import todoLogo from "../../assets/todolistlogo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="" />
    </header>
  );
}
