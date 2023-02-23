import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from './slices/trainerName.slice'
import loadScreen from './slices/isLoading.slice'


const store = configureStore({
    reducer: {
        nameTrainer,
        loadScreen
    }
})

export default store