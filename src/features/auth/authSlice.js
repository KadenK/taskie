import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api";
import { AuthState } from "../../login/authState";
import Cookies from "js-cookie";

const initialState = {
  username: Cookies.get("username") || null,
  subscribedList: Cookies.get("subscribedList") || null,
  authState:
    Cookies.get("authState") === "authenticated"
      ? AuthState.Authenticated
      : AuthState.Unauthenticated,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await api.login(username, password);
      Cookies.set("username", username);
      Cookies.set("subscribedList", data.subscribedList);
      Cookies.set("authState", AuthState.Authenticated);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      Cookies.remove("username");
      Cookies.remove("subscribedList");
      Cookies.remove("authState");
      await api.logout();
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
      Cookies.set("username", username);
      Cookies.set("subscribedList", data.subscribedList);
      Cookies.set("authState", AuthState.Authenticated);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSubscribedList(state, action) {
      state.subscribedList = action.payload;
      Cookies.set("subscribedList", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.subscribedList = action.payload.subscribedList;
        state.authState = AuthState.Authenticated;
      })
      .addCase(login.rejected, (state) => {
        state.authState = AuthState.Unauthenticated;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
        state.subscribedList = null;
        state.authState = AuthState.Unauthenticated;
      })
      .addCase(logout.rejected, (state) => {
        state.authState = AuthState.Authenticated;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.subscribedList = action.payload.subscribedList;
        state.authState = AuthState.Authenticated;
      })
      .addCase(createUser.rejected, (state) => {
        state.authState = AuthState.Unauthenticated;
      });
  },
});

export const { updateSubscribedList } = authSlice.actions;

export default authSlice.reducer;
