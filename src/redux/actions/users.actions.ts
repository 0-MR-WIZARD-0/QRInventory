import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { User } from "types/User";

enum RejectResponses {
  createUserError = "Произошла ошибка при создании пользователя",
  fetchUserError = "Произошла ошибка при получении пользователя"
}

export const createUserThunk = createAsyncThunk<any, { fullName: string; email: string; password: string; teacherInstitution: string }>("user/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  const { email, fullName, password, teacherInstitution } = params;

  try {
    const createdUser = await api.post<any, { data: User }>("/user/create", { email, fullName, password, teacherInstitution }).then(res => res.data);
    return fulfillWithValue(createdUser);
  } catch (error) {
    return rejectWithValue(RejectResponses.createUserError);
  }
});

// fetch user

// edit user

// delete user
