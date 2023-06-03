import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { User } from "types/User";

export enum RejectResponsesUser {
  createUserError = "Произошла ошибка при создании пользователя. Обратитесь к администратору!",
  fetchUserError = "Произошла ошибка при получении пользователя. Обратитесь к администратору!",
  editUserError = "Произошла ошибка при изменении пользователя. Обратитесь к администратору!",
  deleteUserError = "Произошла ошибка при удалении пользователя. Обратитесь к администратору!"
}

export const createUserThunk = createAsyncThunk<
  any,
  { fullName: string; email: string; password: string; teacherInstitution: string }
>("user/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  const { email, fullName, password, teacherInstitution } = params;

  try {
    const res = await api
      .post<any, { data: User }>("/user/create", { email, fullName, password, teacherInstitution })
      .then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponsesUser.createUserError);
  }
});

export const fetchUserThunk = createAsyncThunk<any, { id: string }>(
  "user/fetch",
  async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const res = (await api.get("/user/search", { params: { id: params.id } })).data;
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(RejectResponsesUser.fetchUserError);
    }
  }
);

export const editUserThunk = createAsyncThunk<
  any,
  { id: string; fullName: string; email: string; oldPassword?: string; newPassword?: string }
>("user/edit", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.patch(`/user/edit?id=${params.id}`, { ...params })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponsesUser.editUserError);
  }
});

export const deleteUserThunk = createAsyncThunk<any, { id: string }>(
  "user/delete",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = (await api.delete(`/user/${params.id}`)).data;
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(RejectResponsesUser.deleteUserError);
    }
  }
);
