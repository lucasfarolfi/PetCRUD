import {configureStore} from '@reduxjs/toolkit'
import animalsReducer from './animals/animalsSlice'

const store = configureStore({
    reducer: {
        animals: animalsReducer
    }
})

export default store