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
import {httpDelete, httpGet, httpPut, httpPost, httpGetOne} from '../utils/animals'

jest.mock('../utils/animals', () =>({
    httpGet: jest.fn(),
    httpGetOne: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}))

let store;

describe("Testes de integração - Redux Slice + AnimalsList", () =>{
    beforeEach(() => {
        store = configureStore({reducer: { animals: animalsReducer }});
    });

    afterEach(() => {
        httpGet.mockClear();
        httpGetOne.mockClear();
        httpPost.mockClear();
        httpPut.mockClear();
        httpDelete.mockClear();
    });

    it("Quando o dispatch carrega a função FetchAnimals corretamente", async () =>{
        httpGet.mockImplementation(() => Promise.resolve(
            [{
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
        ))
        
        const page = render(<Provider store={store}><App /></Provider>, {wrapper: MemoryRouter})
        await store.dispatch(fetchAnimals())
        expect(store.getState().animals.status).toBe('ready')
        expect(page.getByText("Bob")).not.toBeNull()
        expect(page.getByText("Nina")).not.toBeNull()
    })

    it("Quando o dispatch carrega a função FetchAnimals e retorna loading", async () =>{
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        httpGet.mockImplementation(() => wait(1000))
        
        const page = render(<Provider store={store}><App /></Provider>, {wrapper: MemoryRouter})
        store.dispatch(fetchAnimals())

        expect(store.getState().animals.status).toBe('loading')
        expect(page.getByText("Carregando animais...")).not.toBeNull()
    })

    it("Quando o dispatch carrega a função FetchAnimals e retorna loading", async () =>{
        httpGet.mockImplementation(() => Promise.reject())
        
        const page = render(<Provider store={store}><App /></Provider>, {wrapper: MemoryRouter})
        await store.dispatch(fetchAnimals())
        
        expect(store.getState().animals.status).toBe('failed')
        expect(page.getByText("Erro ao carregar a lista")).not.toBeNull()
    })
})
