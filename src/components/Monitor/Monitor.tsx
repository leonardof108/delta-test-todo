import styles from "./styles.module.scss";

export default function Monitor() {
  return (
    <>
      <div className={styles.monitor_container}>
        <div className={`${styles.kpi} ${styles.task_one}`}>
          <h3>2</h3>
          <p>Todas as tarefas</p>
        </div>
        <div className={`${styles.kpi} ${styles.task_two}`}>
          <h3>2</h3>
          <p>Tarefas concluídas</p>
        </div>
        <div className={`${styles.kpi} ${styles.task_three}`}>
          <h3>2</h3>
          <p>Não concluídas</p>
        </div>
      </div>
    </>
  );
}
