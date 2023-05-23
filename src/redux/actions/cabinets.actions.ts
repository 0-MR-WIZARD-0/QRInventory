import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Cabinet } from "types/Cabinet";

enum RejectResponses {
  createCabinetError = "Произошла ошибка при создании кабинета",
  fetchCabinetError = "Произошла ошибка при получении кабинета"
}

export const createCabinetThunk = createAsyncThunk<any, { institutionId: string; cabinetNumber: string }>("cabinet/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const createdCabinet = await api.post<any, { data: Cabinet }>("/cabinet/create", { institution: params.institutionId, cabinetNumber: params.cabinetNumber }).then(res => res.data);
    return fulfillWithValue(createdCabinet);
  } catch (error) {
    return rejectWithValue(RejectResponses.createCabinetError);
  }
});

export const fetchCabinetThunk = createAsyncThunk<any, { id: string }>("cabinet/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const cabinet = (await api.get("/cabinet/", { params: { id: params.id } })).data;
    return fulfillWithValue(cabinet);
  } catch (error) {
    return rejectWithValue(RejectResponses.createCabinetError);
  }
});

// edit cabinet thunk

// delete cabinet thunk
