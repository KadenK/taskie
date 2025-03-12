import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import api from "../../app/api";

const initialState = {
  tasks: [],
  currentlyEditing: null,
};

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const data = await api.updateTask(task);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const data = await api.addTask(task);
      return data;
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
      await api.deleteTask(taskId);
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const joinList = createAsyncThunk(
  "tasks/joinList",
  async (listName, { rejectWithValue }) => {
    try {
      const data = await api.joinList(listName);
      return data.tasks || [];
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
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
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
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(joinList.fulfilled, (state, action) => {
        state.tasks = action.payload;
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
