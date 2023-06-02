import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { LoginFormProps, User } from "types/User";

export enum RejectResponsesAuth {
  unauthorized = "Пользователь не авторизован",
  passwords_mismatch = "Пароли не сходятся"
}

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const fetchUserThunk = createAsyncThunk("auth/fetch", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.get<any, { data: User | undefined }>("/user").then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    rejectWithValue(RejectResponsesAuth.unauthorized);
  }
});

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const loginUserThunk = createAsyncThunk<any, LoginFormProps>("auth/login", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post<any, { data: User | undefined }>("/auth/login", params).then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponsesAuth.unauthorized);
  }
});

export const logoutUserThunk = createAsyncThunk("auth/logout", async (params, { fulfillWithValue }) => {
  try {
    await api.get("/auth/logout");
    return fulfillWithValue(null);
  } catch (error) {
    return fulfillWithValue(null);
  }
});

export const validatePasswordThunk = createAsyncThunk<any, { password: string }>("auth/validate", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post("/auth/validate-password", { inputPassword: params.password });
    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(RejectResponsesAuth.passwords_mismatch);
  }
});
