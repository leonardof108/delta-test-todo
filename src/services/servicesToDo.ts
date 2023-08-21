import { TaskTypes } from "@/types/TaskTypes";

export const getTasks = (): TaskTypes[] => {
  const storageTasks = localStorage.getItem("@tasks");

  if (!storageTasks) {
    return [];
  }

  const tasks = JSON.parse(storageTasks) as TaskTypes[];
  return tasks;
};

export const createTask = (task: TaskTypes): string => {
  const storageTasks = localStorage.getItem("@tasks");

  const newTask: TaskTypes = {
    ...task,
    status: false,
  };

  if (storageTasks) {
    const newTasks = [...JSON.parse(storageTasks), newTask];

    localStorage.setItem("@tasks", JSON.stringify(newTasks));

    return task.id;
  }

  const newTasks = [newTask];

  localStorage.setItem("@tasks", JSON.stringify(newTasks));

  return task.id;
};

export const updateTask = (
  id: string,
  data: Partial<TaskTypes>
): TaskTypes | null => {
  const storageTasks = localStorage.getItem("@tasks");

  if (!storageTasks) {
    return null;
  }

  const tasks = JSON.parse(storageTasks) as TaskTypes[];

  let updatedTask: TaskTypes | null = null;

  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      updatedTask = task;

      return {
        ...task,
        ...data,
      };
    }

    return task;
  });

  localStorage.setItem("@tasks", JSON.stringify(newTasks));

  return updatedTask;
};

export const removeTask = (id: string): string | null => {
  const storageTasks = localStorage.getItem("@tasks");

  if (!storageTasks) {
    return null;
  }

  const tasks = JSON.parse(storageTasks) as TaskTypes[];

  const newTasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("@tasks", JSON.stringify(newTasks));

  return id;
};

export const completeTask = (id: string) => {
  const storageTasks = localStorage.getItem("@tasks");

  if (!storageTasks) return;

  const tasks = JSON.parse(storageTasks) as TaskTypes[];

  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status: !task.status,
      };
    }

    return task;
  });

  localStorage.setItem("@tasks", JSON.stringify(newTasks));
};
