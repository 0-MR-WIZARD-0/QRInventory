import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";

export const imageUserThunk = createAsyncThunk<any, {file: any}>("user/avatar", async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('file', params.file);

        const res = await api.post<any>("user/avatar", formData);
        return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
});

export const imageUserIdThunk = createAsyncThunk<any, {id: string, file: any}>("user/avatar", async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('file', params.file);

        const res = await api.post<any>(`user/avatar?id=${params.id}`, formData);
        return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
});

export const imageItemThunk = createAsyncThunk<any, {id: string, file: any}>("item/image", async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('file', params.file);

        const res = await api.post<any>(`item/image?id=${params.id}`, formData);
        console.log(res.data);
        console.log(fulfillWithValue(res.data));
        
        
        return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
});


