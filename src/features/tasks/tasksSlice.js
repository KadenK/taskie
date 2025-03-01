import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import api from "../../app/api";
import { tasks } from "../../util/dummy";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  currentlyEditing: null,
};

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const data = await api.updateTask(task);
      return task;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      if (!task.id) {
        task.id = Math.floor(Math.random() * 1000000);
        task.checked = false;
        task.parentId = task.parentId || null;
      }
      const data = await api.addTask(task);
      return task;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskOrId, { rejectWithValue }) => {
    try {
      const taskId = taskOrId.id || taskOrId;
      const data = await api.deleteTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getTasks();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinList = createAsyncThunk(
  "tasks/joinList",
  async (email, { rejectWithValue }) => {
    try {
      await api.joinList(email);
      const data = await api.getTasks();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setEditingTask(state, action) {
      state.currentlyEditing = action.payload;
    },
    clearEditingTask(state) {
      state.currentlyEditing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (action.payload.id === state.currentlyEditing?.id) {
          state.currentlyEditing = null;
        }
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        let children = state.tasks.filter(
          (task) => task.parentId === action.payload
        );
        while (children.length > 0) {
          const child = children.pop();
          state.tasks = state.tasks.filter((task) => task.id !== child.id);
          children = children.concat(
            state.tasks.filter((task) => task.parentId === child.id)
          );
        }
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(joinList.fulfilled, (state, action) => {
        state.tasks = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      });
  },
});

export const { setTasks, setEditingTask, clearEditingTask } =
  tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;

export const selectRootTasks = createSelector(
  (state) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => task.parentId === null)
);

export const selectTaskChildren = createSelector(
  (state) => state.tasks.tasks,
  (_, taskOrId) => taskOrId,
  (tasks, taskOrId) =>
    tasks.filter((task) => task.parentId === (taskOrId.id || taskOrId))
);

export const selectEditingTask = (state) => state.tasks.currentlyEditing;

export default tasksSlice.reducer;
