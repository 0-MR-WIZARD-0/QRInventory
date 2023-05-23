import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { Item } from "types/Item";

enum RejectResponses {
  fetchItemError = "Произошла ошибка при получении предмета",
  createItemError = "Произошла ошибка при создании предмета"
}

export const createItemThunk = createAsyncThunk<any, { institutionId: string; name: string; article: string }>("item/create", async (params, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const createdCabinet = await api.post<any, { data: Item }>("/item/create", { institution: params.institutionId, name: params.name, article: params.article }).then(res => res.data);
    return fulfillWithValue(createdCabinet);
  } catch (error) {
    return rejectWithValue(RejectResponses.createItemError);
  }
});

export const fetchItemThunk = createAsyncThunk<any, { id: string }>("item/fetch", async (params, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const cabinet = (await api.get("/item/", { params: { id: params.id } })).data;
    return fulfillWithValue(cabinet);
  } catch (error) {
    return rejectWithValue(RejectResponses.fetchItemError);
  }
});

// edit item thunk

// delete item thunk
