import {
  addTask,
  removeTask,
  updateTask,
  setTasks,
} from "@/reducers/taskSlice";
import styles from "./styles.module.scss";
import { Check, Close, Delete, Plus, Resize } from "@/../public/assets/icons";
import { TaskTypes } from "@/types/TaskTypes";
import {
  ChangeEvent,
  MouseEvent,
  ChangeEventHandler,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/store/store";
import {
  createTask,
  getTasks,
  removeTask as removeTaskService,
  updateTask as editTaskService,
} from "@/services/servicesToDo";

interface modalProps {
  open: string;
  close: () => void;
  idSelected: string;
}

export default function ModalTask({ open, close, idSelected }: modalProps) {
  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskTypes[]>([
    {
      id: "",
      title: "",
      description: "",
      status: false,
    },
  ]);

  useEffect(() => {
    const tasks = getTasks();
    dispatch(setTasks(tasks));
  }, []);

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const descriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    setDescriptionInput(e.target.value);
  };

  const handleAddTodoList = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newId = uuidv4();

    if (titleInput == "") {
      alert("Por favor digite um nome para a tarefa");
      return;
    } else if (descriptionInput == "") {
      alert("Por favor digite uma descrição para a tarefa");
      return;
    }

    const newTask = {
      id: newId,
      title: titleInput,
      description: descriptionInput,
      status: false,
    };

    if (newTask) {
      setTaskList([...taskList, newTask]);
      createTask(newTask);
      dispatch(addTask(newTask));
      setTitleInput("");
      setDescriptionInput("");
      close();
    }
  };

  const handleEditTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (titleInput == "") {
      alert("Por favor digite um nome para a tarefa");
      return;
    } else if (descriptionInput == "") {
      alert("Por favor digite uma descrição para a tarefa");
      return;
    }
    const newTask = {
      id: idSelected,
      title: titleInput,
      description: descriptionInput,
      status: false,
    };
    editTaskService(idSelected, { ...newTask });
    dispatch(updateTask({ ...newTask }));
    close();
  };

  const handleRemoveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeTaskService(idSelected);
    dispatch(removeTask(idSelected));
    close();
  };

  if (!open) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${open ? styles.open : null}`}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={() => close()}>
          <Close />
        </span>
        <div className={styles.task_container}>
          <div className={styles.task_container}>
            {open === "deleteTask" ? (
              <>
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
              </>
            ) : (
              <>
                <h1>
                  {open === "addTask" ? "Cadastrar Tarefa" : "Editar Tarefa"}
                </h1>
                <form className={styles.task_name_container}>
                  <label>Nome da tarefa:</label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={titleChange}
                  />
                </form>
                <form className={styles.task_description_container}>
                  <label>Descrição da tarefa:</label>
                  <textarea
                    onChange={descriptionChange}
                    value={descriptionInput}
                  />
                </form>
                <div className={styles.task_button_container}>
                  <button
                    type="button"
                    className={styles.task_cancel_button}
                    onClick={() => close()}
                  >
                    <p>Cancelar</p>
                  </button>

                  {open === "addTask" ? (
                    <button
                      type="button"
                      className={styles.task_action_button}
                      onClick={handleAddTodoList}
                    >
                      <Plus />
                      <p>Adicionar tarefa</p>
                    </button>
                  ) : open === "editTask" ? (
                    <button
                      type="button"
                      className={styles.task_action_button}
                      onClick={handleEditTask}
                    >
                      <Check />
                      <p>Finalizar edição</p>
                    </button>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
