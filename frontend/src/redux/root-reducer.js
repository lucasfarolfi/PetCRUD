import { combineReducers } from 'redux'
import animalReducers from './reducer'

const rootReducer = combineReducers({
    data: animalReducers
})

export default rootReducer