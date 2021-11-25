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
})
