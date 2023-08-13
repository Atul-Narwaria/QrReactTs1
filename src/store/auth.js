import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn:
    Cookies.get("token") && Cookies.get("role") == "admin" ? true : false,
  role: Cookies.get("role") ? Cookies.get("role") : "null",
  isInstituteLogin:
    Cookies.get("token") && Cookies.get("role") == "institute" ? true : false,
  isQrUserLogin: Cookies.get("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      if (state.role == "admin") {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    logout: (state) => {
      state.isInstituteLogin = false;
      state.isLoggedIn = false;
      state.isQrUserLogin = false;
    },
    instituteLogin: (state) => {
      if (state.role == "institute") {
        state.isInstituteLogin = true;
      } else {
        state.isInstituteLogin = false;
      }
    },
    qrUserLogin: (state) => {
      state.isQrUserLogin = Cookies.get("token") ? true : false;
    },

    role: (state) => {
      state.role = Cookies.get("role") ? Cookies.get("role") : "null";
    },
  },
});

export const { login, logout, instituteLogin, qrUserLogin } = authSlice.actions;
export default authSlice.reducer;
