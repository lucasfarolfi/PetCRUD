import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App, { convertDate } from './index';
import {createMemoryHistory} from 'history';
import { MemoryRouter } from 'react-router';
import {Router} from 'react-router-dom';
import store from '../../redux/store'
import {Provider} from 'react-redux'
import AnimalsTable from '../../components/AnimalsTable/index'

describe('Página principal', () =>{
    describe('Quando abro a página principal', () =>{
        it('o botão de criar animal é exibido', () =>{
            render(<Provider store={store}><App/></Provider>)

            const newAnimalBtn = screen.getByTestId('new-animal-btn')
            expect(newAnimalBtn.textContent).toBe('Novo animal')
        })

        it('a tabela é renderizada', () =>{
            render(<Provider store={store}><App/></Provider>)
            expect(screen.getByTestId('animals-table'))
               .not.toBeNull()
        })
    })

    describe('Quando clico no botão de Novo animal', () =>{
        it('é redirecionado para a página de criar animal', () =>{
            const history = createMemoryHistory()

            render(<Provider store={store}><Router history={history}><App/></Router></Provider>, {wrapper: MemoryRouter})

            const newAnimalBtn = screen.getByTestId('new-animal-btn')
            fireEvent.click(newAnimalBtn)

            expect(history.location.pathname).toBe('/animal/novo')       
        })
    })
})