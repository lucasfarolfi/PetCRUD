import * as types from "./actionType"
import axios from "axios"

const getAnimals = (animals) =>({
    type: types.GET_ANIMALS,
    payload: animals,
})

const getAnimal = (animal) =>({
    type: types.GET_ONE_ANIMAL,
    payload: animal
})

const animalDeleted = () =>({
    type: types.DELETE_ANIMALS,
})

const animalAdded = () =>({
    type: types.ADD_ANIMALS,
})

const animalUpdated = () =>({
    type: types.UPDATE_ANIMALS,
})

export const loadAnimals = () =>{
    return function (dispatch){
        axios.get("http://localhost:8080/animais").then(res =>{
            dispatch(getAnimals(res.data))
        }).catch(e => console.log(e))
    }
}

export const deleteAnimal = (id) =>{
    return function (dispatch){
        axios.delete("http://localhost:8080/animais/"+id).then(res =>{
            dispatch(animalDeleted())
            dispatch(loadAnimals())
        }).catch(e => console.log(e))
    }
}

export const addAnimal = (a) =>{
    return function (dispatch){
        axios.post("http://localhost:8080/animais", a).then(res =>{
            dispatch(animalAdded())
            dispatch(loadAnimals())
        }).catch(e => console.log(e))
    }
}

export const getOneAnimal = (id) =>{
    return function (dispatch){
        axios.get("http://localhost:8080/animais/"+id).then(res =>{
            dispatch(getAnimal(res.data))
        }).catch(e => console.log(e))
    }
}

export const updateAnimal = (id, a) =>{
    return function (dispatch){
        axios.put("http://localhost:8080/animais/"+id, a).then(res =>{
            dispatch(animalUpdated())
            dispatch(loadAnimals())
        }).catch(e => console.log(e))
    }
}