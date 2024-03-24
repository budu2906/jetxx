import { createSlice } from '@reduxjs/toolkit';
interface ModalState {
    isModalActive2: boolean;
    isModalActive: boolean;
    takenBet: number;
    takenBet2: number;
    winBalance: number;
    winBalance2: number;
  }
// Define initial state
const initialState:ModalState = {
    isModalActive2:false,
  isModalActive: false,
  takenBet: 1.00,
  takenBet2: 1.00,
  winBalance: 1.00,
  winBalance2: 1.00
};

// Create Redux slice
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Action to set modal state to true
    showModal: state => {
      state.isModalActive = true;
    },
    showModal2: state => {
        state.isModalActive2 = true;
      },
    // Action to set modal state to false
    hideModal: state => {
      state.isModalActive = false;
    },
    hideModal2: state => {
        state.isModalActive2 = false;
      },
    // Action to toggle modal state
    toggleModal: state => {
      state.isModalActive = !state.isModalActive;
    },
    setBet: (state, action)=>{
        state.takenBet = action.payload
    },
    setBet2: (state, action)=>{
        state.takenBet2 = action.payload
    },
    setWin: (state,action)=>{
        state.winBalance = action.payload
    },
    setWin2: (state,action)=>{
        state.winBalance2 = action.payload
    }
  },
});

// Export actions
export const { showModal, hideModal, toggleModal, setBet, setWin, hideModal2,setBet2,setWin2,showModal2 } = modalSlice.actions;

// Export reducer
export default modalSlice.reducer;
