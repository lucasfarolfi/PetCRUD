import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App from '../../../pages/Home/index';
import convertDate from '../../../utils/convertDate';
import {useSelector, useDispatch} from 'react-redux'
import { deleteAnimal, fetchAnimals, selectAllAnimals} from '../../../redux-toolkit/animals/animalsSlice'
import {createMemoryHistory} from 'history';
import { MemoryRouter } from 'react-router';
import {Router} from 'react-router-dom';
import store from '../../../redux-toolkit/store'
import {Provider} from 'react-redux'
import '@testing-library/jest-dom'

jest.mock("react-redux",() => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => jest.fn(param => param))
}))

jest.mock('../../../redux-toolkit/animals/animalsSlice', () => ({
    selectAllAnimals: jest.fn(() => mockState.animals.entities),
    deleteAnimal: jest.fn(),
    fetchAnimals: jest.fn()
}))

const mockState = {
    animals: {
        status: 'not_loaded',
        error: null,
        entities: [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: "12.5",
            date: "2020-01-12"
        },
        {
            id: "2",
            name: "Nina",
            type: "Gato",
            weight: "10.5",
            date: "2020-01-10"
        }]
    }
}

describe('Home component integration tests', () =>{
    beforeEach(() =>{
        useSelector.mockImplementation(cb => cb(mockState))
        useDispatch.mockImplementation(() => jest.fn(param => param))
        selectAllAnimals.mockImplementation(() => mockState.animals.entities)
        fetchAnimals.mockImplementation(() => jest.fn())
        deleteAnimal.mockImplementation(() => jest.fn())
    })

    afterEach(() =>{
        useSelector.mockClear()
        useDispatch.mockClear()
        selectAllAnimals.mockClear()
        fetchAnimals.mockClear()
        deleteAnimal.mockClear()
        jest.clearAllTimers()
    })

    it('Must render all Animal objects in Table', () =>{
        const history = createMemoryHistory()

        render(<Provider store={store}><Router history={history}><App/></Router></Provider>, {wrapper: MemoryRouter})

        expect(screen.getByTestId('animals-table')).toBeInTheDocument()

        mockState.animals.entities.forEach(animal => {
            expect(screen.getByText(animal.name)).toBeInTheDocument()
            expect(screen.getByText(animal.type)).toBeInTheDocument()
            expect(screen.getByText(animal.weight + " Kg")).toBeInTheDocument()
            expect(screen.getByText(convertDate(animal.date))).toBeInTheDocument()
        })
    })

    it('Must redirect to Create Page, when click in New Animal Button', () =>{
        const history = createMemoryHistory()

        render(<Provider store={store}><Router history={history}><App/></Router></Provider>, {wrapper: MemoryRouter})

        const newAnimalBtn = screen.getByTestId('new-animal-btn')
        fireEvent.click(newAnimalBtn)

        expect(history.location.pathname).toBe('/animal/novo')       
    })

    it("Must show loading message, when the dispatch status is 'loading'", async () =>{
        useSelector.mockImplementation(cb => cb({ animals: {status: 'loading'}}))
        const history = createMemoryHistory()

        const page = render(<Provider store={store}><Router history={history}><App/></Router></Provider>, {wrapper: MemoryRouter})

        expect(page.getByText("Carregando animais...")).toBeInTheDocument()
    })

    it("Must show error message, when the dispatch status is 'failed'", async () =>{
        useSelector.mockImplementation(cb => cb({ animals: {status: 'failed'}}))
        const history = createMemoryHistory()

        const page = render(<Provider store={store}><Router history={history}><App/></Router></Provider>, {wrapper: MemoryRouter})
        
        expect(page.getByText("Erro ao carregar a lista")).toBeInTheDocument()
    })
})