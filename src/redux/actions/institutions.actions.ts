import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Institution } from "types/Institution";

enum RejectResponses {
  createInstitutionError = "Произошла ошибка при создании учреждения",
  fetchInstitutionError = "Произошла ошибка при получении учреждения",
  editInstitutionError = "Произошла ошибка при изменении учреждения"
}

export const createInstitutionThunk = createAsyncThunk<any, { name: string }>("item/create", async (params, { fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post<any, { data: Institution }>("/institution/create", { name: params.name }).then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.createInstitutionError);
  }
});
