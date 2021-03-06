import * as types from "./actionType"

const initialState = {
    animals: [],
    animal: {},
    loading: true
}

const animalReducers = (state = initialState, action) =>{
    switch(action.type){
        case types.GET_ANIMALS:
            return{
                ...state, animals: action.payload, loading: false
            }
        case types.GET_ONE_ANIMAL:
            return{
                ...state, animal: action.payload, loading: false
            }
        case types.DELETE_ANIMALS:
            return{
                ...state, loading: false
            }
        case types.ADD_ANIMALS:
            return{
                ...state, loading: false
            }
        case types.UPDATE_ANIMALS:
            return{
                ...state, loading: false
            }
        default:
            return state
    }
}

export default animalReducers