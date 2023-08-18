import { DeleteTask, EditTask, InputIcon } from "../../../public/assets/icons";
import ModalTask from "../ModalTask/ModalTask";
import styles from "./styles.module.scss";
import { useState } from "react";

export default function Tasks() {
  // const [isHovering, setIsHovered] = useState(false);
  // const onMouseEnter = () => setIsHovered(true);
  // const onMouseLeave = () => setIsHovered(false);
  const [openModal, setOpenModal] = useState("");
  console.log(openModal);
  return (
    <>
      <div className={styles.tasks_container}>
        <p>Suas tarefas:</p>
        <div className={styles.tasks_list}>
          <div
            className={`${styles.tasks}`}
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
          >
            <div className={styles.tasks_left}>
              <button type="button">
                <InputIcon />
              </button>
              <div>
                <h3>Tarefa 1</h3>
                <p>Lorem Ipsum that lorem.</p>
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
          </div>
        </div>
      </div>
      <ModalTask open={openModal} close={() => setOpenModal("")} />
    </>
  );
}
