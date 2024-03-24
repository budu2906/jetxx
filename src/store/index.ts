import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import betsSlice from "./slices/userSlices/betsSlice";
import xSlice from "./slices/userSlices/xSlice";
import xHistorySlice from "./slices/userSlices/xHistorySlice";
import balanceSlice from "./slices/userSlices/balanceSlice";
import modalSlice from "./slices/modalSlice";

const store = configureStore({
    reducer: {
        betSlice: betsSlice,
        xSlice: xSlice,
        xHistorySlice: xHistorySlice,
        balanceSlice: balanceSlice,
        activateSlice: modalSlice
    },
})
type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;