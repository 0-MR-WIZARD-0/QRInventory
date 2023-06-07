import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { Item } from "types/Item";

export enum RejectResponsesItem {
  fetchItemError = "Произошла ошибка при получении предмета",
  fetchItemsError = "Произошла ошибка при получении предметов",
  createItemError = "Произошла ошибка при создании предмета",
  editItemError = "Произошла ошибка при изменении предмета",
  deleteItemError = "Произошла ошибка при удалении предмета",
  unfilledFields = "Присутствуют незаполненные поля"
}

export const createItemThunk = createAsyncThunk<Item, { institutionId: string; name: string; article: string }>(
  "item/create",
  async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post<any, { data: Item | BackendError }>("/item/create", {
        institution: params.institutionId,
        name: params.name,
        article: params.article
      });
      if (!res || !(res.data as Item)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesItem.createItemError);
      return fulfillWithValue(res.data as Item);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchItemThunk = createAsyncThunk<any, { id: string }>("item/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await api.get<any, { data: Item | BackendError }>("/item/", { params: { id: params.id } });
    if (!res || !(res.data as Item)?.id) throw new Error((res.data as BackendError)?.description ?? RejectResponsesItem.fetchItemError);
    return fulfillWithValue(res.data as Item);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editItemThunk = createAsyncThunk<Item, { id: string; article?: string; name?: string; institution?: string }>(
  "item/edit",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.patch<any, { data: Item | BackendError | undefined }>("/item/edit", { ...params });
      if (!res) throw new Error(RejectResponsesItem.editItemError);
      return fulfillWithValue(res.data as Item);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItemThunk = createAsyncThunk<Item, { id: string }>("item/delete", async (params, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await api.delete<any, { data: Item | BackendError | undefined }>(`/item/${params.id}`);
    if (!res) throw new Error(RejectResponsesItem.deleteItemError);
    return fulfillWithValue(res.data as Item);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const searchItemThunk = createAsyncThunk<Item[] | Item, { institution: string; take: number; skip: number; article?: string; id?: string }>(
  "item/search",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api.get<any, { data: { items: Item[] } | Item | BackendError | undefined }>(`/item`, { params: { ...params } });
      if (!res || res.data === undefined) throw new Error((res.data as BackendError)?.description ?? RejectResponsesItem.fetchItemsError);
      // немного косячно с типами
      if (Array.isArray((res.data as { items: Item[] })?.items)) {
        return fulfillWithValue((res.data as { items: Item[] }).items);
      } else {
        return fulfillWithValue(res.data as Item);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
