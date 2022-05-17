import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStore } from "../types/types";
import axios from "axios";
import { goodsStoreSlice } from "./GoodsStore";

export const login = createAsyncThunk(
  "api/login",
  async (user: { username: string; password: string }) => {
    const resp = await axios.post("api/login", user);
    return resp.data;
  }
);
export const logout = createAsyncThunk("api/logout", async () => {
  const resp = await axios.get("api/logout");
  return resp.data;
});
export const cookieLogin = createAsyncThunk("api/login1", async () => {
  const resp = await axios.get("/api/login");
  return resp.data;
});
export const signup = createAsyncThunk(
  "api/signup",
  async (user: {
    email: string;
    name: string;
    surname: string;
    password: string;
  }) => {
    const resp = await axios.post("api/signup", user);
    return resp.data;
  }
);
interface userStoreState {
  user: UserStore;
  isAuthorized: boolean;
  isSigndUp: boolean;
  loading: boolean;
  errors: null | {};
}

const initialState: userStoreState = {
  user: {} as UserStore,
  isAuthorized: false,
  isSigndUp: false,
  loading: false,
  errors: null,
};

export const userStoreSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    resetIsSigndUp: (state) => {
      state.isSigndUp = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthorized = true;
    });
    builder.addCase(cookieLogin.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload.user);
      state.user = action.payload.user;
      state.isAuthorized = true;
    });
    builder.addCase(cookieLogin.rejected, (state, action) => {
      console.log("reject");
      console.log(action);
      state = initialState;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthorized = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isSigndUp = true;
    });
  },
});

export const { resetIsSigndUp } = userStoreSlice.actions;

export default userStoreSlice.reducer;
