import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import AnimalTable from './index';
import TableLine, { convertDate } from './tableLine'
import {Router} from 'react-router-dom';
import store from '../../redux/store'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history';

describe('Componente da linha da tabela', () =>{
    
    it('deve exibir a data da linha corretamente', () =>{
        const convertedDate = convertDate('2020-05-20');
        expect(convertedDate).toBe('20/05/2020');
    })
})