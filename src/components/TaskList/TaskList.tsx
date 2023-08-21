import { useEffect, useState } from "react";

import { DeleteTask, EditTask, InputIcon } from "../../../public/assets/icons";
import ModalTask from "../ModalTask/ModalTask";
import styles from "./styles.module.scss";
import { Check } from "../../../public/assets/icons";
import { TaskTypes } from "@/types/TaskTypes";
import { statusTask } from "@/reducers/taskSlice";
import { completeTask } from "@/services/servicesToDo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface modalOpenProps {
  modalOpen: string;
  idSelected?: string;
}

export default function TaskList() {
  const dispatch = useDispatch();
  const taskSelector = useSelector((state: RootState) => state.task);

  const [openModal, setOpenModal] = useState<modalOpenProps>({
    modalOpen: "",
    idSelected: "",
  });
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const [finishedTasks, setFinishedTasks] = useState<TaskTypes[]>([]);

  useEffect(() => {
    const localStoragetasks = JSON.parse(
      localStorage.getItem("@tasks") || "[]"
    );
    const taskFinished = localStoragetasks.filter(
      (task: TaskTypes) => task.status === true
    );
    setFinishedTasks(taskFinished);
    const taskNotFinished = localStoragetasks.filter(
      (task: TaskTypes) => task.status === false
    );
    setTasks(taskNotFinished);
  }, [taskSelector]);

  const handleCompletedTask = (id: string) => {
    completeTask(id);
    dispatch(statusTask(id));
  };

  return (
    <>
      <div className={styles.tasks_container}>
        <p>Suas tarefas:</p>
        {tasks.length === 0 ? (
          <div className={styles.container_not_task}>
            <h3>Nenhuma Tarefa Cadastrada</h3>
          </div>
        ) : (
          <ul className={styles.task_list}>
            {tasks.map((task) => (
              <li key={task.id} className={`${styles.tasks}`}>
                <div className={styles.tasks_left}>
                  <button
                    type="button"
                    onClick={() => handleCompletedTask(task.id)}
                  >
                    <InputIcon />
                  </button>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                </div>
                <div className={`${styles.tasks_right}`}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenModal({
                        modalOpen: "editTask",
                        idSelected: task.id,
                      })
                    }
                  >
                    <EditTask />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenModal({
                        modalOpen: "deleteTask",
                        idSelected: task.id,
                      })
                    }
                  >
                    <DeleteTask />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.finished_tasks_container}>
        <p>Concluídas:</p>
        {finishedTasks.length === 0 ? (
          <div className={styles.container_not_task}>
            <h3>Nenhuma Tarefa Concluída</h3>
          </div>
        ) : (
          <ul className={styles.finished_task_list}>
            {finishedTasks.map((task) => (
              <li key={task.id} className={styles.finished_tasks}>
                <div className={styles.finished_tasks_left}>
                  <button
                    type="button"
                    onClick={() => handleCompletedTask(task.id)}
                  >
                    <Check />
                  </button>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                </div>
                <div className={`${styles.finished_tasks_right}`}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenModal({
                        modalOpen: "deleteTask",
                        idSelected: task.id,
                      })
                    }
                  >
                    <DeleteTask />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ModalTask
        open={openModal.modalOpen}
        close={() => setOpenModal({ modalOpen: "" })}
        idSelected={openModal.idSelected}
        setTasks={setTasks}
      />
    </>
  );
}
