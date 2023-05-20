import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Cabinet } from "types/Cabinet";

export const createCabinetThunk = createAsyncThunk<any, { institutionId: string; cabinetNumber: string }>("cabinets/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const createdCabinet = await api.post<any, { data: Cabinet }>("/cabinet/create", { institution: params.institutionId, cabinetNumber: params.cabinetNumber }).then(res => res.data);
    return fulfillWithValue(createdCabinet);
  } catch (error) {
    return rejectWithValue("Произошла ошибка при создании кабинета");
  }
});
