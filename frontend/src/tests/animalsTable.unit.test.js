import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {TableLine} from '../components/AnimalsTable/tableLine'
import {Router, MemoryRouter} from 'react-router-dom';
import store from '../redux/store'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';
import AnimalsTable from '../components/AnimalsTable/index';
import { selectAllAnimals } from '../redux-toolkit/animals/animalsSlice';

/*jest.mock('../components/AnimalsTable/tableLine', () => ({
    ...jest.requireActual('../components/AnimalsTable/tableLine'),
    TableLine: jest.fn(() => <tr><td>MockedLine</td></tr>)
}))*/

describe('Componente da tabela de animais', () =>{
   /* beforeEach(() => {
        TableLine.mockImplementation(() =>{
            return (<tr><td>MockedLine</td></tr>)
        }
    }))*/

    it('Quando é renderizada com props vazio', () =>{
        const {container} = render(<Provider store={store}><AnimalsTable /></Provider>)
        expect(container.textContent).toBe("Não há animais a serem exibidos")
    })

    it('Quando é renderizada com a lista vazia', () =>{
        const {container} = render(<Provider store={store}><AnimalsTable animals={[]}/></Provider>)
        expect(container.textContent).toBe("Não há animais a serem exibidos")
    })

    it('Quando é renderizada com um animal na lista', () =>{
        const animal = [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }]
        render(<Provider store={store}><AnimalsTable animals={animal}/></Provider>, {wrapper: MemoryRouter})
        expect(screen.getByTestId('animals-table')).not.toBeNull()
        expect(screen.getByText(animal[0].name).textContent).toBe(animal[0].name)
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
