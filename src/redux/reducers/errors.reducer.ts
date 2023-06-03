import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { generateShortUUID } from "helpers/functions";
import { createInstitutionThunk } from "redux/actions/institutions.actions";
import { fetchUserThunk, loginUserThunk, validatePasswordThunk } from "redux/actions/auth.actions";
import { BackendError } from "types/App";
import { RejectedAction } from "types/Redux";

export enum DefaultErrors {
  institutionNotSelected = "Учреждение отсутствует, либо не выбрано",
  invalidId = "Произошла ошибка: невалидный ID. Обратитесь к администратору!",
  unexpectedError = "Непредвиденная ошибка"
}

export enum ErrorCategories {
  auth = "Авторизация",
  user = "Пользователь",
  institution = "Учреждение",
  item = "Предмет",
  cabinet = "Кабинет",
  default = "Обычная"
}

export type ErrorPopup = {
  id: string;
  type: keyof typeof ErrorCategories;
  description: string;
};

const initialState: ErrorPopup[] = [];

const reducers: { [name in keyof typeof ErrorCategories]: string[] } = {
  user: [fetchUserThunk.rejected.toString()],
  auth: [loginUserThunk.rejected.toString()],
  cabinet: [],
  institution: [createInstitutionThunk.rejected.toString()],
  item: [],
  // сюда любые остальные
  default: []
};

const ErrorsSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Omit<ErrorPopup, "id">>) => {
      const uuid = generateShortUUID();
      return [...state, { ...action.payload, id: uuid }];
    },
    removeError: (state, action: PayloadAction<Pick<ErrorPopup, "id">>) => {
      return state.filter(error => error.id !== action.payload.id);
    }
  },
  extraReducers: builder =>
    Object.assign(
      {},
      Object.keys(reducers).map(k => {
        return builder.addMatcher(
          (action: RejectedAction) =>
            [...reducers[k as keyof typeof ErrorCategories]].indexOf(action.type) > -1,
          (
            state,
            action: PayloadAction<BackendError> | PayloadAction<AxiosError<BackendError>>
          ) => {
            const uuid = generateShortUUID();
            return [
              ...state,
              {
                description: (action.payload as AxiosError<BackendError>).response
                  ? (action.payload as AxiosError<BackendError>).response?.data.description ??
                    (action.payload as AxiosError<BackendError>).response?.data.message ??
                    DefaultErrors.unexpectedError
                  : (action.payload as BackendError).description ??
                    (action.payload as BackendError).message ??
                    DefaultErrors.unexpectedError,
                type: k as keyof typeof ErrorCategories,
                id: uuid
              }
            ];
          }
        );
      })
    )
});

export const errorActions = ErrorsSlice.actions;

export default ErrorsSlice.reducer;
