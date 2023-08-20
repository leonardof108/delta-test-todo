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
    addTask: (state, action: PayloadAction<TaskTypes>) => {
      state.tasks.push(action.payload);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== idToRemove);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updatedTask: TaskTypes }>
    ) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
