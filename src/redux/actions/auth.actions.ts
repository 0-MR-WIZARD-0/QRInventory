import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { LoginFormProps, User } from "types/User";

export enum RejectResponsesAuth {
  unauthorized = "Пользователь не авторизован",
  passwords_mismatch = "Пароли не сходятся",
  logout = "Произошла ошибка при выходе"
}

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const fetchUserThunk = createAsyncThunk<User, { initial?: boolean }>("auth/fetch", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.get<any, { data: User | BackendError }>("/user");
    if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesAuth.unauthorized);
    return fulfillWithValue(res.data as User);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const loginUserThunk = createAsyncThunk<any, LoginFormProps>("auth/login", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post<any, { data: User | BackendError }>("/auth/login", params);
    if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesAuth.unauthorized);

    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logoutUserThunk = createAsyncThunk("auth/logout", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.get<any, { data: User | BackendError }>("/auth/logout");
    if (!res || !(res.data as User)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesAuth.logout);
    return fulfillWithValue(null);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const validatePasswordThunk = createAsyncThunk<any, { password: string }>(
  "auth/validate",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post<boolean, { data: boolean | BackendError }>("/auth/validate-password", { inputPassword: params.password });
      if (!res || typeof res.data !== "boolean") throw new Error((res.data as BackendError)?.description ?? RejectResponsesAuth.passwords_mismatch);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
