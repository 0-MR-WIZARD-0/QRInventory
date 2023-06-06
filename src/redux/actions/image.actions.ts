import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";

export const imageUserThunk = createAsyncThunk<any, { id: string; file: Blob | null }>(
  "user/avatar",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (params.file) formData.append("file", params.file);

      const res = await api.post<{ message: string }>("/user/avatar", formData, { params: { id: params.id } });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const imageUserIdThunk = createAsyncThunk<any, { id: string; file: any }>(
  "user/avatar",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", params.file);

      const res = await api.post<{ message: string }>(`/user/avatar`, formData, { params: { id: params.id } });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const imageItemThunk = createAsyncThunk<any, { id: string; file: any }>(
  "item/image",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", params.file);

      const res = await api.post<any>(`/item/image`, formData, { params: { id: params.id } });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
