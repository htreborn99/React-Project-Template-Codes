import { configureStore  } from "@reduxjs/toolkit";

// Step 1: Import all the slices that you need here! 
// import counterReducer from '../features/exampleSlice'
import loginSlice from '../features/loginSlice'

export const store = configureStore({
    // This reducer 
    reducer: {
        // Step 2: Add the imported files here. 
        login: loginSlice,
    }
} 
// 

)

// This is the single store for your entire application, multiple stores are possible but not recommended. 
