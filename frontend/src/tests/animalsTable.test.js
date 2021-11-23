import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import TableLine, { convertDate } from '../components/AnimalsTable/tableLine'
import {Router, MemoryRouter} from 'react-router-dom';
import store from '../redux/store'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';
import AnimalsTable from '../components/AnimalsTable/index';

jest.mock('../components/AnimalsTable/tableLine', () => jest.fn(() => (<tr><td colSpan={5}>MockedLine</td></tr>)))

describe('Componente da tabela de animais', () =>{
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('Quando é renderizada com props vazio', () =>{
        const {container} = render(<Provider store={store}><AnimalsTable /></Provider>)
        expect(container.textContent).toBe("Não há animais a serem exibidos")
    })

    it('Quando é renderizada com a lista vazia', () =>{
        const {container} = render(<Provider store={store}><AnimalsTable animals={[]}/></Provider>)
        expect(container.textContent).toBe("Não há animais a serem exibidos")
    })

    it('Quando é renderizada com um animal', () =>{
        const animal = [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }]
        render(<Provider store={store}><AnimalsTable animals={animal}/></Provider>)
        expect(screen.getByTestId('animals-table')).toBeInTheDocument()
        expect(TableLine).toHaveBeenCalledTimes(1)
    })

    it('Quando é renderizada com vários animais', () =>{
        const animal = [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        },{
            id: "2",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        },{
            id: "3",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }]
        render(<Provider store={store}><AnimalsTable animals={animal}/></Provider>)
        expect(screen.getByTestId('animals-table')).toBeInTheDocument()
        expect(TableLine).toHaveBeenCalledTimes(animal.length)
    })

    /*describe('Quando a tabela é renderizada', () =>{
        it('a linha da tabela deverá receber e exibir os atributos corretamente', () =>{
            const history = createMemoryHistory()

            const { container } = render(
                <Provider store={store}>
                    <Router history={history}><App>
                        <TableLine id="619572d1da346912a5ea67b7"
                            name="Jorge" date="05/10/2025" type="Cachorro" weight={15.5} />
                    </App></Router>
                </Provider>
            )
            expect(container.firstChild).toMatchSnapshot()
        })
    })*/
})
