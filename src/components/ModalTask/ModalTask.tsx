import { addTask, removeTask } from "@/reducers/taskSlice";
import styles from "./styles.module.scss";
import { Close, Delete, Plus, Resize } from "@/../public/assets/icons";
import { TaskTypes } from "@/types/TaskTypes";
import {
  ChangeEvent,
  MouseEvent,
  ChangeEventHandler,
  useState,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface modalProps {
  open: string;
  close: () => void;
  id: string;
}

export default function ModalTask({ open, close, id }: modalProps) {
  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskTypes[]>([]);

  console.log(id);

  useEffect(() => {
    if (open) {
      const tasksLocalStorage = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );
      setTaskList(tasksLocalStorage);
    }
  }, [open]);

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const descriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    setDescriptionInput(e.target.value);
  };

  const taskSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const id = uuidv4();
    const newTask: TaskTypes = {
      id: id,
      title: titleInput,
      description: descriptionInput,
      status: false,
    };

    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    dispatch(addTask(newTask));

    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));

    setTitleInput("");
    setDescriptionInput("");
  };

  const handleRemoveTask = () => {
    dispatch(removeTask(id));
    close();
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
            <textarea onChange={descriptionChange} />
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
            <button
              type="button"
              className={styles.task_delete_button}
              onClick={handleRemoveTask}
            >
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
