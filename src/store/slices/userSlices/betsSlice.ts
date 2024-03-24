import { createSlice } from "@reduxjs/toolkit";
import { BetType } from "../../../types/widgets/bets/types";

const initialState: BetType[] = [];

const betsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBet(state, { payload }: { payload: BetType | undefined }) {
            if (payload) {
                state.push(payload);
            } else {
                state = [];
            }
        },
        pushBet(state, {payload}: {payload: { arr: BetType[], el: BetType }}) {
            //
            let { arr, el } = payload;
            let index = arr.findIndex(item => item.name === el.name);
            arr[index] = el;
            state = [...arr, el];
        },
        clearBets(state) {
            state.splice(0, state.length);
        }
    }
})

export const { setBet, clearBets, pushBet } = betsSlice.actions;
export default betsSlice.reducer;