import * as types from "./actionType"
import axios from "axios"

const getAnimals = (animals) =>({
    type: types.GET_ANIMALS,
    payload: animals,
})

const animalDeleted = () =>({
    type: types.DELETE_ANIMALS,
})

export const loadAnimals = () =>{
    return function (dispatch){
        axios.get("http://localhost:8080/animais").then(res =>{
            console.log("Res", res)
            dispatch(getAnimals(res.data))
        }).catch(e => console.log(e))
    }
}

export const deleteAnimal = (id) =>{
    return function (dispatch){
        axios.delete("http://localhost:8080/animais/"+id).then(res =>{
            console.log("Res", res)
            dispatch(animalDeleted())
            dispatch(loadAnimals())
        }).catch(e => console.log(e))
    }
}