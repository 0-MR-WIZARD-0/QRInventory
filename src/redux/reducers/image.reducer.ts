import { createSlice } from "@reduxjs/toolkit";
import { imageItemThunk, imageUserIdThunk, imageUserThunk } from "redux/actions/image.actions";

type InitialState = {
    data: string;
    loading: boolean;
    error: string | undefined;
  };
  
  const initialState: InitialState = {
    data: "",
    loading: true,
    error: undefined,
  };

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase((imageUserThunk.pending, imageUserIdThunk.pending, imageItemThunk.pending), (state) => {
          state.loading = true;
          state.error = "null";
        })
        .addCase((imageUserThunk.fulfilled, imageUserIdThunk.fulfilled, imageItemThunk.fulfilled), (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase((imageUserThunk.rejected, imageUserIdThunk.rejected, imageItemThunk.rejected), (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default imageSlice.reducer;