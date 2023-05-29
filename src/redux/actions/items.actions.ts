import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Item } from "types/Item";

enum RejectResponses {
  fetchItemError = "Произошла ошибка при получении предмета",
  createItemError = "Произошла ошибка при создании предмета",
  editItemError = "Произошла ошибка при изменении предмета",
  deleteItemError = "Произошла ошибка при удалении предмета"
}

export const createItemThunk = createAsyncThunk<any, { institutionId: string; name: string; article: string }>("item/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post<any, { data: Item }>("/item/create", { institution: params.institutionId, name: params.name, article: params.article }).then(res => res.data);
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.createItemError);
  }
});

export const fetchItemThunk = createAsyncThunk<any, { id: string }>("item/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.get("/item/", { params: { id: params.id } })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.fetchItemError);
  }
});

export const editItemThunk = createAsyncThunk<any, { id: string; article?: string; name?: string; institution?: string }>("item/edit", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.patch("/item/edit", { ...params })).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.editItemError);
  }
});

export const deleteItemThunk = createAsyncThunk<any, { id: string }>("cabinet/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.delete(`/item/${params.id}`)).data;
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(RejectResponses.deleteItemError);
  }
});
