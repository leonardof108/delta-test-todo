import { Check } from "../../../public/assets/icons";
import styles from "./styles.module.scss";

export default function FinishedTasksList() {
  return (
    <>
      <div className={styles.finished_tasks_container}>
        <p>Concluídas:</p>

        <div className={styles.finished_tasks}>
          <div className={styles.finished_tasks_left}>
            <button type="button">
              <Check />
            </button>
            <div>
              <h3>Tarefa 2</h3>
              <p>Lorem Ipsum that lorem.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
