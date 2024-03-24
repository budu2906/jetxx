import { createSlice } from "@reduxjs/toolkit";
interface xType {
    firstX: number,
    minX: number,
    maxX: number
}

const initialState:xType = {
    firstX: 0,
    minX: 0,
    maxX: 0,
}
const xSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setX(state, { payload }: { payload: number }) {
            state.firstX = payload
        },
        setMinX(state, action){
            state.minX = action.payload
      
        },
        setMaxX(state,action){
            state.maxX = action.payload

        }
    }
})

export const { setX, setMaxX, setMinX } = xSlice.actions;
export default xSlice.reducer;