import React from 'react';
import { render, screen } from '@testing-library/react'
import {useSelector, useDispatch} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { fetchAnimals} from '../redux-toolkit/animals/animalsSlice'
import AnimalsTable from '../components/AnimalsTable/index'
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from '../redux/store'

jest.mock("react-redux",() => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => jest.fn(param => param))
}))

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

describe("Testes de integração Página home + Tabela", () =>{
    beforeEach(() =>{
        useSelector.mockImplementation(cb => cb(mockState))
        useDispatch.mockImplementation(() => jest.fn(param => param))
    })

    afterEach(() =>{
        useSelector.mockClear()
        fetchAnimals.mockClear()
        jest.clearAllTimers()
    })

    it("Quando a lista de animais é carregada pelo redux e exibida corretamente", () =>{
        fetchAnimals.mockImplementation(() => {
            mockState.animals.status = 'ready'
        })
        
        const history = createMemoryHistory()
        const page = render(<Router history={history}><AnimalsTable animals={mockState.animals.entities}/></Router>, 
            {wrapper: MemoryRouter})
        expect(page.getByTestId('animals-table')).not.toBeNull()
        expect(page.getByText(mockState.animals.entities["0"].name)).not.toBeNull()
        expect(page.getByText(mockState.animals.entities["1"].name)).not.toBeNull()
    })

    it('Quando é renderizada com dois animais na lista', () =>{
        const animal = [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        },{
            id: "2",
            name: "Nick",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }]
        render(<Provider store={store}><AnimalsTable animals={animal}/></Provider>, {wrapper: MemoryRouter})
        expect(screen.getByTestId('animals-table')).not.toBeNull()
        expect(screen.getByText(animal[0].name).textContent).toBe(animal[0].name)
        expect(screen.getByText(animal[1].name).textContent).toBe(animal[1].name)
    })

    it('Quando é renderizada com N animais na lista', () =>{
        const animal = []
        let counter = 1
        for(counter=1; counter <= 6; counter++){
            animal.push({
                id: counter+"",
                name: "Animal"+counter,
                type: "Cachorro",
                weight: 10.5,
                date: "2020-01-10"
            })
        }
        render(<Provider store={store}><AnimalsTable animals={animal}/></Provider>, {wrapper: MemoryRouter})
        expect(screen.getByTestId('animals-table')).not.toBeNull()

        animal.forEach(a => expect(screen.getByText(a.name).textContent).toBe(a.name))
    })
})