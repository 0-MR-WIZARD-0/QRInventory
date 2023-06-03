import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { LoginFormProps, User } from "types/User";

export enum RejectResponsesAuth {
  unauthorized = "Пользователь не авторизован. Проверьте правильность введения почты и пароля!",
  passwords_mismatch = "Пароли не сходятся"
}

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const fetchUserThunk = createAsyncThunk(
  "auth/fetch",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get<any, { data: User | BackendError | undefined }>("/user");
      if (!res || !(res.data as User)?.id)
        throw new Error(
          (res.data as BackendError)?.description ?? RejectResponsesAuth.unauthorized
        );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const loginUserThunk = createAsyncThunk<any, LoginFormProps>(
  "auth/login",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post<any, { data: User | BackendError | undefined }>(
        "/auth/login",
        params
      );
      if (!res || !(res.data as User)?.id)
        throw new Error(
          (res.data as BackendError)?.description ?? RejectResponsesAuth.unauthorized
        );

      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (params, { fulfillWithValue }) => {
    try {
      await api.get("/auth/logout");
      return fulfillWithValue(null);
    } catch (error) {
      return fulfillWithValue(null);
    }
  }
);

export const validatePasswordThunk = createAsyncThunk<any, { password: string }>(
  "auth/validate",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post("/auth/validate-password", { inputPassword: params.password });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(RejectResponsesAuth.passwords_mismatch);
    }
  }
);
