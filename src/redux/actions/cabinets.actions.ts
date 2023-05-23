import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Cabinet } from "types/Cabinet";

enum RejectResponses {
  createCabinetError = "Произошла ошибка при создании кабинета",
  fetchCabinetError = "Произошла ошибка при получении кабинета",
  editCabinetError = "Произошла ошибка при изменении кабинета",
  deleteCabinetError = "Произошла ошибка при удалении кабинета"
}

export const createCabinetThunk = createAsyncThunk<any, { institutionId: string; cabinetNumber: string }>("cabinet/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post<any, { data: Cabinet }>("/cabinet/create", { institution: params.institutionId, cabinetNumber: params.cabinetNumber }).then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.createCabinetError);
  }
});

export const fetchCabinetThunk = createAsyncThunk<any, { id: string }>("cabinet/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.get("/cabinet/", { params: { id: params.id } })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.createCabinetError);
  }
});

export const editCabinetThunk = createAsyncThunk<any, { id: string; institutionId?: string; cabinetNumber?: string; teachers?: string[]; items?: string[] }>("cabinet/edit", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.patch("/cabinet/edit", { ...params })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.editCabinetError);
  }
});

export const deleteCabinetThunk = createAsyncThunk<any, { id: string }>("cabinet/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.delete(`/cabinet/${params.id}`)).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.deleteCabinetError);
  }
});
