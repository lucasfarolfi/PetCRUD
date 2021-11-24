import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App, { convertDate } from '../pages/Home/index';
import {createMemoryHistory} from 'history';
import { MemoryRouter } from 'react-router';
import {Router} from 'react-router-dom';
import store from '../redux-toolkit/store'
import {Provider} from 'react-redux'
import AnimalsTable from '../components/AnimalsTable/index'

describe('Página principal', () =>{
    
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