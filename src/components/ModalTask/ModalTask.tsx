import styles from "./styles.module.scss";
import { Close, Delete, Plus, Resize } from "@/../public/assets/icons";
import {
  ChangeEvent,
  MouseEvent,
  ChangeEventHandler,
  useState,
  useEffect,
} from "react";

interface modalProps {
  open: string;
  close: () => void;
  taskData: any;
}

interface taskListProps {
  title: string;
  description: string;
}

export default function ModalTask({ open, close, taskData }: modalProps) {
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [taskList, setTaskList] = useState<taskListProps[]>([
    {
      title: "",
      description: "",
    },
  ]);

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const descriptionChange = (e: ChangeEventHandler<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescriptionInput(e.target.value);
  };

  const taskSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTask = { title: titleInput, description: descriptionInput };
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    taskData(updatedTaskList);
  };

  if (!open) {
    return null;
  }

  let modalContent;

  if (open === "addTask") {
    modalContent = (
      <div className={styles.task_container}>
        <div className={styles.task_container}>
          <h1>Cadastrar Tarefa</h1>
          <form className={styles.task_name_container}>
            <label>Nome da tarefa:</label>
            <input type="text" onChange={titleChange} />
          </form>
          <form className={styles.task_description_container}>
            <label>Descrição da tarefa:</label>
            {/* <div className={styles.textarea_wrapper}> */}
            {/* <Resize /> */}
            {/* <span className={styles.resizable_input}> */}
            <textarea type="text" onChange={descriptionChange} />
            {/* </span> */}
            {/* </div> */}
          </form>
          <div className={styles.task_button_container}>
            <button
              type="button"
              className={styles.task_cancel_button}
              onClick={() => close()}
            >
              <p>Cancelar</p>
            </button>
            <button
              type="button"
              className={styles.task_action_button}
              onClick={taskSubmit}
            >
              <Plus />
              <p>Adicionar tarefa</p>
            </button>
          </div>
        </div>
      </div>
    );
  } else if (open === "editTask") {
    modalContent = (
      <div className={styles.task_container}>
        <div className={styles.task_container}>
          <h1>Editar Tarefa</h1>
          <form className={styles.task_name_container}>
            <label>Nome da tarefa:</label>
            <input type="text" />
          </form>
          <form className={styles.task_description_container}>
            <label>Descrição da tarefa:</label>
            {/* <div className={styles.textarea_wrapper}> */}
            {/* <Resize /> */}
            <textarea />
            {/* </div> */}
          </form>
          <div className={styles.task_button_container}>
            <button
              type="button"
              className={styles.task_cancel_button}
              onClick={() => close()}
            >
              <p>Cancelar</p>
            </button>
            <button type="button" className={styles.task_action_button}>
              <Plus />
              <p>Finalizar edição</p>
            </button>
          </div>
        </div>
      </div>
    );
  } else if (open === "deleteTask") {
    modalContent = (
      <div className={styles.task_container}>
        <div className={styles.task_container}>
          <h1>Excluir Tarefa</h1>
          <p>Tem certeza que deseja deletar esta tarefa?</p>

          <div className={styles.task_button_container}>
            <button
              type="button"
              className={styles.task_cancel_button}
              onClick={() => close()}
            >
              <p>Cancelar</p>
            </button>
            <button type="button" className={styles.task_delete_button}>
              <Delete />
              <p>Deletar</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.modal} ${open ? styles.open : null}`}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={() => close()}>
          <Close />
        </span>
        {modalContent}
      </div>
    </div>
  );
}
