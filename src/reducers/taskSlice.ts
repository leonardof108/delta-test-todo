import { TaskTypes } from "@/types/TaskTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  tasks: TaskTypes[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "TASKS",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskTypes[]>) => {
      return { ...state, tasks: action.payload };
    },

    addTask: (state, action: PayloadAction<TaskTypes>) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload as TaskTypes],
      };
    },

    updateTask: (state, action: PayloadAction<TaskTypes>) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            ...action.payload,
          };
        }

        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };
    },

    removeTask: (state, action: PayloadAction<string>) => {
      const newTasks = state.tasks.filter((task) => task.id !== action.payload);

      return {
        ...state,
        tasks: newTasks,
      };
    },

    statusTask: (state, action: PayloadAction<string>) => {
      const statusTask = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            done: !task.status,
          };
        }

        return task;
      });

      return {
        ...state,
        tasks: statusTask,
      };
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks, statusTask } =
  taskSlice.actions;

export default taskSlice.reducer;
