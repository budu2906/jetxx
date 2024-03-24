import { createSlice } from "@reduxjs/toolkit";

const XHistorySlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setHistory(state, { payload }: { payload: number }) {
            state.push(payload);
        }
    }
})

export const { setHistory } = XHistorySlice.actions;
export default XHistorySlice.reducer;