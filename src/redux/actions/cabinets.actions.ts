import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Cabinet } from "types/Cabinet";

// тут будет пагинация
export const getCabinetsThunk = createAsyncThunk("cabinets/get", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const cabinets = await api.get<any, { data: Cabinet[] }>("/cabinet/all").then(res => res.data);
    return fulfillWithValue(cabinets);
  } catch (error) {
    return rejectWithValue("Произошла ошибка при загрузке кабинетов");
  }
});

export const createCabinetThunk = createAsyncThunk<any, { institutionId: string; cabinetNumber: string }>("cabinets/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const createdCabinet = await api.post<any, { data: Cabinet }>("/cabinet/create", { institution: params.institutionId, cabinetNumber: params.cabinetNumber }).then(res => res.data);
    return fulfillWithValue(createdCabinet);
  } catch (error) {
    return rejectWithValue("Произошла ошибка при создании кабинета");
  }
});
