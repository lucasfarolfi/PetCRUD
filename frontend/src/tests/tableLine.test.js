import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event'
import AnimalTable from '../components/AnimalsTable/index';
import TableLine, { convertDate } from '../components/AnimalsTable/tableLine'
import {Router, MemoryRouter} from 'react-router-dom';
import store from '../redux/store'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';

describe('Componente da linha da tabela', () =>{
    
    it('deve exibir a data da linha corretamente', () =>{
        const convertedDate = convertDate('2020-05-20');
        expect(convertedDate).toBe('20/05/2020');
    })

    it('Animal sem alguma prop', () =>{
        const {container} = render(<Provider store={store}><table><tbody><TableLine /></tbody></table></Provider>)
        expect(container.textContent).toBe("Não foi possível exibir o projeto")
    })

    it('deve exibir o animal corretamente', () => {
        const animal = {
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }
        render(<Provider store={store}><table><tbody>
            <TableLine id={animal.id} name={animal.name} type={animal.type} weight={animal.weight} date={animal.date}/>
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

    it('o botão de editar deve funcionar corretamente', () => {
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
            <TableLine id={animal.id} name={animal.name} type={animal.type} weight={animal.weight} date={animal.date}/>
            </tbody></table></Router></Provider>
        , {wrapper: MemoryRouter})
        const alterBtn = screen.getByText("Alterar")
        expect(alterBtn.textContent).toBe("Alterar")

        fireEvent.click(alterBtn)
        expect(history.location.pathname).toBe("/animal/"+animal.id+"/editar")
    })

    it('o botão de excluir deve funcionar corretamente', () => {
        const deleteFn = jest.fn()
        const animal = {
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: 10.5,
            date: "2020-01-10"
        }
        render(<Provider store={store}><table><tbody>
            <TableLine id={animal.id} name={animal.name} type={animal.type} 
            weight={animal.weight} date={animal.date} handleDelete={deleteFn}/>
            </tbody></table></Provider>
        , {wrapper: MemoryRouter})
        const deleteBtn = screen.getByText("Excluir")
        expect(deleteBtn.textContent).toBe("Excluir")

        userEvent.click(deleteFn, {button: 0})
        expect(deleteBtn).toHaveBeenCalled()
    })
})