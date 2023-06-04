import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { Item } from "types/Item";

export enum RejectResponsesItem {
  fetchItemError = "Произошла ошибка при получении предмета. Обратитесь к администратору!",
  createItemError = "Произошла ошибка при создании предмета. Обратитесь к администратору!",
  editItemError = "Произошла ошибка при изменении предмета. Обратитесь к администратору!",
  deleteItemError = "Произошла ошибка при удалении предмета. Обратитесь к администратору!"
}

export const createItemThunk = createAsyncThunk<any, { institutionId: string; name: string; article: string }>("item/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const res = await api.post<any, { data: Item | BackendError | undefined }>(
      "/item/create", 
      { institution: params.institutionId, name: params.name, article: params.article }).then(res => res.data);
      if (!res || !(res as Item)?.id)
      throw new Error(
        (res as BackendError)?.description ??
          RejectResponsesItem.createItemError
      );
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchItemThunk = createAsyncThunk<any, { id: string }>("item/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.get<any, { data: Item | BackendError | undefined}>(
      "/item/", 
      { params: { id: params.id } })).data
      if (!res || !(res as Item)?.id)
      throw new Error(
        (res as BackendError)?.description ??
          RejectResponsesItem.fetchItemError
      );  
    return fulfillWithValue(res);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editItemThunk = createAsyncThunk<any, { id: string; article?: string; name?: string; institution?: string }>("item/edit", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.patch<any, {data: Item | BackendError | undefined}>(
      "/item/edit", 
      { ...params }))
      if (!res || !(res.data as Item)?.id)
      throw new Error(
        (res.data as BackendError)?.description ??
          RejectResponsesItem.editItemError
      );  
    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteItemThunk = createAsyncThunk<any, { id: string }>("cabinet/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = (await api.delete<any, {data: Item | BackendError | undefined}>(`/item/${params.id}`));
    if (!res || !(res.data as Item)?.id)
      throw new Error(
        (res.data as BackendError)?.description ??
          RejectResponsesItem.deleteItemError
      );  
    return fulfillWithValue(res.data);
  } catch (error) {
    return rejectWithValue(error);
  }
});
