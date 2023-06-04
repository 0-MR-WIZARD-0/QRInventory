import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "helpers/axios";
import { BackendError } from "types/App";
import { Institution } from "types/Institution";

export enum RejectResponsesInstitution {
  createInstitutionError = "Произошла ошибка при создании учреждения. Обратитесь к администратору!",
}

export const createInstitutionThunk = createAsyncThunk<any, { name: string }>(
  "item/create",
  async (params, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post<any, { data: Institution | BackendError }>(
        "/institution/create", 
        {name: params.name});
      if (!res || !(res.data as Institution)?.id)
        throw new Error(
          (res.data as BackendError)?.description ??
            RejectResponsesInstitution.createInstitutionError
        );

      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
