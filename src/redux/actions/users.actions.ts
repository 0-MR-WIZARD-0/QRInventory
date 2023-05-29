import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { User } from "types/User";

enum RejectResponses {
  createUserError = "Произошла ошибка при создании пользователя",
  fetchUserError = "Произошла ошибка при получении пользователя",
  editUserError = "Произошла ошибка при изменении пользователя",
  deleteUserError = "Произошла ошибка при удалении пользователя"
}

export const createUserThunk = createAsyncThunk<any, { fullName: string; email: string; password: string; teacherInstitution: string }>("user/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  const { email, fullName, password, teacherInstitution } = params;

  try {
    const res = await api.post<any, { data: User }>("/user/create", { email, fullName, password, teacherInstitution }).then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.createUserError);
  }
});

export const fetchUserThunk = createAsyncThunk<any, { id: string }>("user/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.get("/user/search", { params: { id: params.id } })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.fetchUserError);
  }
});

export const editUserThunk = createAsyncThunk<any, { id: string; fullName?: string; email?: string }>("user/edit", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.patch("/user/edit", { ...params })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.editUserError);
  }
});

export const deleteUserThunk = createAsyncThunk<any, { id: string }>("user/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.delete(`/user/${params.id}`)).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.deleteUserError);
  }
});

// delete user
