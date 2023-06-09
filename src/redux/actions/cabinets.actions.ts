import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { Cabinet } from "types/Cabinet";

export enum RejectResponsesCabinet {
  createCabinetError = "Произошла ошибка при создании кабинета",
  fetchCabinetError = "Произошла ошибка при получении кабинета",
  editCabinetError = "Произошла ошибка при изменении кабинета",
  deleteCabinetError = "Произошла ошибка при удалении кабинета"
}

export const createCabinetThunk = createAsyncThunk<any, { institutionId: string; cabinetNumber: string }>(
  "cabinet/create",
  async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post<any, { data: Cabinet | BackendError | undefined }>("/cabinet/create", {
        institution: params.institutionId,
        cabinetNumber: params.cabinetNumber
      });
      if (!res || !(res.data as Cabinet)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesCabinet.createCabinetError);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCabinetThunk = createAsyncThunk<any, { id: string }>(
  "cabinet/fetch",
  async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.get<any, { data: Cabinet | BackendError | undefined }>("/cabinet/", { params: { id: params.id } });
      if (!res || !(res.data as Cabinet)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesCabinet.fetchCabinetError);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editCabinetThunk = createAsyncThunk<Cabinet, { id: string; cabinetNumber?: string; teachers?: string[]; items?: string[] }>(
  "cabinet/edit",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.patch<any, { data: Cabinet | BackendError | undefined }>("/cabinet/edit", { ...params });
      if (!res) throw new Error(RejectResponsesCabinet.editCabinetError);
      return fulfillWithValue(res.data as Cabinet);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCabinetThunk = createAsyncThunk<any, { id: string }>("cabinet/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await api.delete<any, { data: Cabinet | BackendError | undefined }>(`/cabinet/${params.id}`);
    if (!res) throw new Error(RejectResponsesCabinet.deleteCabinetError);
    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(error);
  }
});
