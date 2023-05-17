import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { LoginFormProps, User } from "types/User";

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const fetchUserThunk = createAsyncThunk("user/setUser", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const user = await api.get<any, { data: User | undefined }>("/user").then(res => res.data);
    return fulfillWithValue(user);
  } catch (error) {
    return rejectWithValue("Пользователь не авторизован");
  }
});

// https://stackoverflow.com/questions/67227015/how-to-use-createasyncthunk-with-typescript-how-to-set-types-for-the-pending
export const loginUserThunk = createAsyncThunk<any, LoginFormProps, { rejectValue: string }>("user/login", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const user = await api.post<any, { data: User | undefined }>("/auth/login", params).then(res => res.data);
    return fulfillWithValue(user);
  } catch (error) {
    return rejectWithValue("Пользователь не авторизован");
  }
});
