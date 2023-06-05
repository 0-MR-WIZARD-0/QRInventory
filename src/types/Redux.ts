import { AsyncThunk } from "@reduxjs/toolkit";

export type GenericAsyncThunk<P = void> = AsyncThunk<P, unknown, any>;

export type PendingAction<P = void> = ReturnType<GenericAsyncThunk<P>["pending"]>;
export type RejectedAction<P = void> = ReturnType<GenericAsyncThunk<P>["rejected"]>;
export type FulfilledAction<P = void> = ReturnType<GenericAsyncThunk<P>["fulfilled"]>;
