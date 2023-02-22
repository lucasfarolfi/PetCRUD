import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import {useSelector, useDispatch} from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import AnimalsTable from '../../../components/AnimalsTable/index'
import { deleteAnimal } from '../../../redux-toolkit/animals/animalsSlice'
import convertDate from '../../../utils/convertDate';
import {Provider} from 'react-redux'
import store from '../../../redux/store'
import '@testing-library/jest-dom'

jest.mock("react-redux",() => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => jest.fn(param => param))
}))

jest.mock('../../../redux-toolkit/animals/animalsSlice', () => ({
    deleteAnimal: jest.fn()
}))

describe("AnimalsTable component integration tests", () =>{

    beforeEach(() =>{
        useSelector.mockImplementation(cb => cb(mockState))
        useDispatch.mockImplementation(() => jest.fn(param => param))
        deleteAnimal: jest.fn()
    })

    afterEach(() =>{
        useSelector.mockClear()
        useDispatch.mockClear()
        deleteAnimal.mockClear()
    })

    it('Must render the animal list in table correctly', () =>{
        const animalList = [
            {
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
            }
        ]

        render(<Provider store={store}><AnimalsTable animals={animalList}/></Provider>, {wrapper: MemoryRouter})

        expect(screen.getByTestId('animals-table')).toBeInTheDocument()
        animalList.forEach(animal => {
            expect(screen.getByText(animal.name)).toBeInTheDocument()
            expect(screen.getByText(animal.type)).toBeInTheDocument()
            expect(screen.getByText(animal.weight + " Kg")).toBeInTheDocument()
            expect(screen.getByText(convertDate(animal.date))).toBeInTheDocument()
        })
    })


    it('Must delete an animal, when the delete button is clicked', () =>{
        const animalList = [
            {
                id: "1",
                name: "Bob",
                type: "Cachorro",
                weight: "12.5",
                date: "2020-01-12"
            }
        ]
        let confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => true));

        render(<Provider store={store}><AnimalsTable animals={animalList}/></Provider>, {wrapper: MemoryRouter})

        expect(screen.getByTestId('delete-button-1')).toBeInTheDocument()
        const newAnimalBtn = screen.getByTestId('delete-button-1')
        fireEvent.click(newAnimalBtn)

        expect(deleteAnimal).toHaveBeenCalledTimes(1)
    })


    it('Must not delete an animal, when the delete button is clicked and cancel window confirmation', () =>{
        const animalList = [
            {
                id: "1",
                name: "Bob",
                type: "Cachorro",
                weight: "12.5",
                date: "2020-01-12"
            }
        ]
        let confirmSpy = jest.spyOn(window, 'confirm');
        confirmSpy.mockImplementation(jest.fn(() => false));

        render(<Provider store={store}><AnimalsTable animals={animalList}/></Provider>, {wrapper: MemoryRouter})

        expect(screen.getByTestId('delete-button-1')).toBeInTheDocument()
        const newAnimalBtn = screen.getByTestId('delete-button-1')
        fireEvent.click(newAnimalBtn)

        expect(deleteAnimal).toHaveBeenCalledTimes(0)
    })
})