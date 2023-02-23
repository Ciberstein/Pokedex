import { createSlice } from "@reduxjs/toolkit";

const loadScreenSlice = createSlice({
    name: 'loadScreen',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => action.payload
    }
})

export const  { setIsLoading } = loadScreenSlice.actions

export default loadScreenSlice.reducer