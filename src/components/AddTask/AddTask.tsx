import { useState } from "react";
import ModalTask from "../ModalTask/ModalTask";
import styles from "./styles.module.scss";
import { Plus } from "../../../public/assets/icons";

export default function AddTask() {
  const [openModal, setOpenModal] = useState("");

  console.log(openModal);
  return (
    <>
      <div className={styles.add_task_container}>
        <div className={styles.add_task}>
          <button type="button" onClick={() => setOpenModal("addTask")}>
            <Plus />
            <p>Adicionar tarefa</p>
          </button>
        </div>
      </div>
      <ModalTask open={openModal} close={() => setOpenModal("")} />
    </>
  );
}
