import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";
import { AuthState } from "../../login/authState";

const initialState = {
  username: null,
  authState: AuthState.Unauthenticated,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await api.login(username, password);
      return username;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await api.createUser(username, password);
      return username;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload;
        state.authState = AuthState.Authenticated;
      })
      .addCase(login.rejected, (state) => {
        state.authState = AuthState.Unauthenticated;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
        state.authState = AuthState.Unauthenticated;
      })
      .addCase(logout.rejected, (state) => {
        state.authState = AuthState.Authenticated;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.username = action.payload;
        state.authState = AuthState.Authenticated;
      })
      .addCase(createUser.rejected, (state) => {
        state.authState = AuthState.Unauthenticated;
      });
  },
});

export default authSlice.reducer;
