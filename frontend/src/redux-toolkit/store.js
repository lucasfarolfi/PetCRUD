import {configureStore} from '@reduxjs/toolkit'

// import animalsReducer
export const store = configureStore({
    reducer: {
        animals: animalsReducer
    }
})