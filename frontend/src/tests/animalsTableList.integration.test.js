import React from 'react';
import { render } from '@testing-library/react'
import App from '../pages/Home'
import {useSelector, useDispatch} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import animalsReducer, {deleteAnimal, fetchAnimals, selectAllAnimals} from '../redux-toolkit/animals/animalsSlice'
import AnimalsTable from '../components/AnimalsTable/index'
import userEvent from '@testing-library/user-event'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';
import { configureStore } from '@reduxjs/toolkit'
import {Router} from 'react-router-dom';

jest.mock("react-redux",() => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => jest.fn(param => param))
}))

let store;

const mockState = {
    animals: {
        status: 'not_loaded',
        error: null,
        entities: [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: "10.5",
            date: "2020-01-10"
        },
        {
            id: "2",
            name: "Nina",
            type: "Cachorro",
            weight: "10.5",
            date: "2020-01-10"
        }]
    }
}

jest.mock('../redux-toolkit/animals/animalsSlice', () => ({
    selectAllAnimals: jest.fn(() => mockState.animals.entities),
    deleteAnimal: jest.fn(),
    fetchAnimals: jest.fn()
}))

jest.useFakeTimers() //setTimeout

describe("Testes de integração Página home + Tabela", () =>{
    beforeEach(() =>{
        //store = configureStore({reducer: { animals: animalsReducer }});
        useSelector.mockImplementation(cb => cb(mockState))
    })

    afterEach(() =>{
        useSelector.mockClear()
        fetchAnimals.mockClear()
        jest.clearAllTimers()
    })

    it("Quando a lista de animais não é carregada pelo redux", () =>{/*
        const history = createMemoryHistory()
        render(<Provider store={store}><Router history={history}><App/></Router></Provider>, {wrapper: MemoryRouter})*/
    })
})