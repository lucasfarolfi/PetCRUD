import React from 'react';
import { render } from '@testing-library/react'
import App from '../../pages/Home'
import { MemoryRouter } from 'react-router-dom'
import animalsReducer, { fetchAnimals } from '../../redux-toolkit/animals/animalsSlice'
import {Provider} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost, httpGetOne} from '../../api/AnimalsHttpRequest'

jest.mock('../../api/AnimalsHttpRequest', () =>({
    httpGet: jest.fn(),
    httpGetOne: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}))

let store;

describe("Slice Table List integration tests", () =>{
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

    it("Must load the animals list correctly", async () =>{
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

    it("Must generate loading message, when the dispatch status is 'loading'", async () =>{
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        httpGet.mockImplementation(() => wait(1000))
        
        const page = render(<Provider store={store}><App /></Provider>, {wrapper: MemoryRouter})
        store.dispatch(fetchAnimals())

        expect(store.getState().animals.status).toBe('loading')
        expect(page.getByText("Carregando animais...")).not.toBeNull()
    })

    it("Must generate error message, when the dispatch status is 'failed'", async () =>{
        httpGet.mockImplementation(() => Promise.reject())
        
        const page = render(<Provider store={store}><App /></Provider>, {wrapper: MemoryRouter})
        await store.dispatch(fetchAnimals())
        
        expect(store.getState().animals.status).toBe('failed')
        expect(page.getByText("Erro ao carregar a lista")).not.toBeNull()
    })
})
