import { DeleteTask, EditTask, InputIcon } from "../../../public/assets/icons";
import ModalTask from "../ModalTask/ModalTask";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Check } from "../../../public/assets/icons";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
// }

export default function TaskList() {
  // const [isHovering, setIsHovered] = useState(false);
  // const onMouseEnter = () => setIsHovered(true);
  // const onMouseLeave = () => setIsHovered(false);
  const [openModal, setOpenModal] = useState("");
  const [tasks, setTasks] = useState([]);

  // const tasks: Task[] = [
  //   { id: 1, title: "Task 1", description: "Description 1" },
  // ];

  const handleTaskData = (newTaskData) => {
    setTasks(newTaskData);
  };

  return (
    <>
      <div className={styles.tasks_container}>
        <p>Suas tarefas:</p>
        <ul className={styles.task_list}>
          {/* {tasks.map((task) => ( */}
          <li
            className={
              `${styles.tasks}`
              // onMouseEnter={onMouseEnter}
              // onMouseLeave={onMouseLeave}
            }
          >
            <div className={styles.tasks_left}>
              <button type="button">
                <InputIcon />
              </button>
              <div>
                <h3>a</h3>
                <p>a</p>
              </div>
            </div>
            <div
              // className={`${styles.tasks_right}
              // ${isHovering ? styles.tasks_actions : ""}
              //  `}
              className={`${styles.tasks_right}`}
            >
              <button type="button" onClick={() => setOpenModal("editTask")}>
                <EditTask />
              </button>
              <button type="button" onClick={() => setOpenModal("deleteTask")}>
                <DeleteTask />
              </button>
            </div>
          </li>
          {/* ))} */}
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
        open={openModal}
        close={() => setOpenModal("")}
        taskData={handleTaskData}
      />
    </>
  );
}
