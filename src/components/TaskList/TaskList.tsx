import { DeleteTask, EditTask, InputIcon } from "../../../public/assets/icons";
import ModalTask from "../ModalTask/ModalTask";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Check } from "../../../public/assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TaskTypes } from "@/types/TaskTypes";

interface modalOpenProps {
  modalOpen: string;
  idSelected?: string;
}

export default function TaskList() {
  const tasksSelector = useSelector((state: RootState) => state.task.tasks);
  const [openModal, setOpenModal] = useState<modalOpenProps>({
    modalOpen: "",
    idSelected: "",
  });
  const [tasks, setTasks] = useState<TaskTypes[]>([]);

  useEffect(() => {
    const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks") || "[]");

    setTasks(tasksLocalStorage);
  }, [tasksSelector]);

  return (
    <>
      <div className={styles.tasks_container}>
        <p>Suas tarefas:</p>
        <ul className={styles.task_list}>
          {tasks.map((task) => (
            <li key={task.title} className={`${styles.tasks}`}>
              <div className={styles.tasks_left}>
                <button type="button">
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
      </div>
      <div className={styles.finished_tasks_container}>
        <p>Concluídas:</p>
        <ul className={styles.finished_task_list}>
          <li className={styles.finished_tasks}>
            <div className={styles.finished_tasks_left}>
              <button type="button">
                <Check />
              </button>
              <div>
                <h3>Tarefa 2</h3>
                <p>Lorem Ipsum that lorem.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ModalTask
        open={openModal.modalOpen}
        close={() => setOpenModal({ modalOpen: "" })}
        id={openModal.idSelected}
      />
    </>
  );
}
