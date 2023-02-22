import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import TableLine from '../../../components/AnimalsTable/tableLine'
import {Router, MemoryRouter} from 'react-router-dom';
import convertDate from '../../../utils/convertDate';
import store from '../../../redux/store'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';

describe('TableLine component unit tests', () =>{
    
    it('Must show date correctly', () =>{
        const convertedDate = convertDate('2020-05-20');
        expect(convertedDate).toBe('20/05/2020');
    })

    it('Must generate error, when undefined animal object is passed', () =>{
        const {container} = render(<Provider store={store}><table><tbody><TableLine /></tbody></table></Provider>)
        expect(container.textContent).toBe("Não foi possível exibir o projeto")
    })

    it('Must show the animal data correctly', () => {
        const animal = {
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }
        render(<Provider store={store}><table><tbody>
            <TableLine animal={animal}/>
        </tbody></table></Provider>)
        const name = screen.queryByText(animal.name)
        const type = screen.queryByText(animal.type)
        const weight = screen.queryByText(animal.weight+" Kg")
        const date = screen.queryByText(convertDate(animal.date))
        const alterBtn = screen.queryByText("Alterar")
        const deleteBtn = screen.queryByText("Excluir")

        expect(name.textContent).toBe(animal.name)
        expect(type.textContent).toBe(animal.type)
        expect(weight.textContent).toBe(animal.weight+" Kg")
        expect(date.textContent).toBe(convertDate(animal.date))
        expect(alterBtn.textContent).toBe("Alterar")
        expect(deleteBtn.textContent).toBe("Excluir")
    })

    it('Must go to the edit screen, when the Edit button is clicked', () => {
        const history = createMemoryHistory()
        const animal = {
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }
        render(<Provider store={store}>
            <Router history={history}><table><tbody>
            <TableLine animal={animal}/>
            </tbody></table></Router></Provider>
        , {wrapper: MemoryRouter})
        const alterBtn = screen.getByText("Alterar")
        expect(alterBtn.textContent).toBe("Alterar")

        fireEvent.click(alterBtn)
        expect(history.location.pathname).toBe("/animal/"+animal.id+"/editar")
    })

    it('Must delete an animal, when the Edit button is clicked', () => {
        const deleteFn = jest.fn()
        const animal = {
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }
        render(<Provider store={store}><table><tbody>
            <TableLine animal={animal} handleDelete={deleteFn}/>
            </tbody></table></Provider>
        , {wrapper: MemoryRouter})
        const deleteBtn = screen.getByText("Excluir")
        expect(deleteBtn.textContent).toBe("Excluir")

        fireEvent.click(deleteBtn)
        expect(deleteFn).toHaveBeenCalledTimes(1)
    })
})