import { RootState } from "@/store/store";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TaskTypes } from "@/types/TaskTypes";

export default function Monitor() {
  const selector = useSelector((state: RootState) => state.task.tasks);
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<TaskTypes[]>([]);

  useEffect(() => {
    const localStoragetasks = JSON.parse(localStorage.getItem("@tasks") || "[]");
    const taskFinished = localStoragetasks.filter((task: TaskTypes) => task.status === true);
    setFinishedTasks(taskFinished);
    const taskNotFinished = localStoragetasks.filter((task: TaskTypes) => task.status === false);
    setTasks(taskNotFinished);
  }, [selector]);

  const totalizer = tasks.length + finishedTasks.length;

  return (
    <>
      <div className={styles.monitor_container}>
        <div className={`${styles.kpi} ${styles.task_one}`}>
          <h3>{totalizer}</h3>
          <p>Todas as tarefas</p>
        </div>
        <div className={`${styles.kpi} ${styles.task_two}`}>
          <h3>{finishedTasks.length}</h3>
          <p>Tarefas concluídas</p>
        </div>
        <div className={`${styles.kpi} ${styles.task_three}`}>
          <h3>{tasks.length}</h3>
          <p>Não concluídas</p>
        </div>
      </div>
    </>
  );
}
