import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementByAmount: (state,action) => {
            state.count += action.payload
        }
    }
})

// Reducers are actions for your variable
// Take note that inside reducers : { This is an object }


// In order to use the actions, both of these statements must be written. 
// counterSlice --> is the slice created.
export const { increment,decrement, reset, incrementByAmount } = counterSlice.actions;

// Why export this?
// This is because the store will need it. It is just like that. 
export default counterSlice.reducer
