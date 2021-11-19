import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App from './index';
import TableLine, { convertDate } from './tableLine'
import {Router} from 'react-router-dom';
import store from '../../redux/store'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';

describe('Componente da tabela de animais', () =>{

    describe('Quando a tabela é renderizada', () =>{
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
    })
})
