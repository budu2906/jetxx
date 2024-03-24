import { createSlice } from "@reduxjs/toolkit";

let storage = localStorage.getItem('balance') || '1000';
let num = parseFloat(parseFloat(storage).toFixed(2)) || 1000;
const initialState = { value: num  };

const balanceSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBalance(state, { payload }: { payload: number }) {
            state.value += payload;
        },
        decBalance(state, {payload}: {payload: number}) {
            // const step = 1;
            // let balance = state.value;
            // let g = state.value - payload;
            // console.log(g);
            // let interval = setInterval(() => {
            //     console.log(balance);
            //     balance-=step;
            //     if (balance === g) {
            //         console.log(balance);
            //         clearInterval(interval);
            //     }
            // }, 1);
            state.value-=payload
        }
    }
})

export const { setBalance, decBalance } = balanceSlice.actions;
export default balanceSlice.reducer;