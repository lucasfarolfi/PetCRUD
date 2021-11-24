import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {Router} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {createMemoryHistory} from 'history';
import { saveAnimal } from '../redux-toolkit/animals/animalsSlice'
import Create from '../pages/Create/index'

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => jest.fn((param) => param))
}))

const mockState = {
    animals: {
        status: 'not_loaded',
        error: null,
        entities: [{
            id: "1",
            name: "Bob",
            type: "Cachorro",
            weight: "10.5",
            date: "2020-01-10"
        },
        {
            id: "2",
            name: "Nina",
            type: "Cachorro",
            weight: "10.5",
            date: "2020-01-10"
        }]
    }
}

jest.mock("../redux-toolkit/animals/animalsSlice", () => ({
    saveAnimal: jest.fn()
}))

describe('Formulário de criar animal', () =>{
    beforeEach(() => {
        useSelector.mockImplementation(cb => cb(mockState))
        useDispatch.mockImplementation(() => jest.fn(param => param))
        saveAnimal.mockImplementation(() => {
            mockState.animals.status = 'ready',
            mockState.animals.entities.push({
                id: "3",
                name: "Bob",
                type: "Cachorro",
                weight: "10.5",
                date: "2020-01-10"
            })
        })
    })

    it('O formulário é renderizado ao entrar na página', ()=>{
        render(<Create />)
        expect(screen.getByText("Novo Animal").textContent).toBe("Novo Animal")

        //Verify Labels
        expect(screen.getByText("Nome")).not.toBeNull()
        expect(screen.getByText("Tipo")).not.toBeNull()
        expect(screen.getByText("Peso")).not.toBeNull()
        expect(screen.getByText("Data de nascimento")).not.toBeNull()

        //Verify inputs
        expect(screen.getByLabelText("Nome")).not.toBeNull()
        expect(screen.getByLabelText("Tipo")).not.toBeNull()
        expect(screen.getByLabelText("Peso")).not.toBeNull()
        expect(screen.getByLabelText("Data de nascimento")).not.toBeNull()

        expect(screen.getByText("Salvar")).not.toBeNull()
        expect(screen.getByText("Cancelar")).not.toBeNull()
    })

    it('O botão de Cancelar funciona corretamente', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)
        const cancelBtn = screen.getByText("Cancelar")
        fireEvent.click(cancelBtn)
        expect(history.location.pathname).toBe("/")
    })

    it('Quando o formulário é preenchido e enviado corretamente', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)

        const animal = {
            id: "3",
            name: "Bob",
            type: "Cachorro",
            weight: "10.5",
            date: "2020-01-10"
        }

        //Get inputs
        const name = screen.getByLabelText("Nome")
        const type = screen.getByLabelText("Tipo")
        const weight = screen.getByLabelText("Peso")
        const date = screen.getByLabelText("Data de nascimento")
        const saveBtn = screen.getByText("Salvar")

        //Input state changes
        fireEvent.change(name, {target:{value: animal.name}})
        fireEvent.change(type, {target:{value: animal.type}})
        fireEvent.change(weight, {target:{value: animal.weight}})
        fireEvent.change(date, {target:{value: animal.date}})

        //Verify inputs
        expect(name.value).toBe(animal.name)
        expect(type.value).toBe(animal.type)
        expect(weight.value).toBe(animal.weight)
        expect(date.value).toBe(animal.date)

        fireEvent.click(saveBtn)
        expect(saveAnimal).toHaveBeenCalledTimes(1)
        expect(mockState.animals.entities.filter(a => a.id === "3")[0]).toEqual(animal)
    })

    it('Quando o botão de Salvar é clicado sem preencher nenhum input', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)

        const saveBtn = screen.getByText("Salvar")
        fireEvent.click(saveBtn)

        const errMsg = screen.getByText("O formulário deve ser preenchido corretamente")
        expect(errMsg).not.toBeNull()
    })

    it('Quando o botão de Salvar é clicado sem preencher o nome', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)

        //Get inputs
        const name = screen.getByLabelText("Nome")
        const type = screen.getByLabelText("Tipo")
        const weight = screen.getByLabelText("Peso")
        const date = screen.getByLabelText("Data de nascimento")
        const saveBtn = screen.getByText("Salvar")

        //Input state changes
        fireEvent.change(type, {target:{value: "Cachorro"}})
        fireEvent.change(weight, {target:{value: 10.5}})
        fireEvent.change(date, {target:{value: "2012-10-10"}})
        fireEvent.click(saveBtn)

        //Verify inputs
        expect(name.value).toBe("")
        expect(type.value).toBe("Cachorro")
        expect(weight.value).toBe("10.5")
        expect(date.value).toBe("2012-10-10")

        const errMsg = screen.getByText("O formulário deve ser preenchido corretamente")
        expect(errMsg).not.toBeNull()
    })

    it('Quando o botão de Salvar é clicado sem preencher o tipo', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)

        //Get inputs
        const name = screen.getByLabelText("Nome")
        const type = screen.getByLabelText("Tipo")
        const weight = screen.getByLabelText("Peso")
        const date = screen.getByLabelText("Data de nascimento")
        const saveBtn = screen.getByText("Salvar")

        //Input state changes
        fireEvent.change(name, {target:{value: "Bob"}})
        fireEvent.change(weight, {target:{value: 10.5}})
        fireEvent.change(date, {target:{value: "2012-10-10"}})
        fireEvent.click(saveBtn)

        //Verify inputs
        expect(name.value).toBe("Bob")
        expect(type.value).toBe("")
        expect(weight.value).toBe("10.5")
        expect(date.value).toBe("2012-10-10")

        const errMsg = screen.getByText("O formulário deve ser preenchido corretamente")
        expect(errMsg).not.toBeNull()
    })

    it('Quando o botão de Salvar é clicado sem preencher o peso', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)

        //Get inputs
        const name = screen.getByLabelText("Nome")
        const type = screen.getByLabelText("Tipo")
        const weight = screen.getByLabelText("Peso")
        const date = screen.getByLabelText("Data de nascimento")
        const saveBtn = screen.getByText("Salvar")

        //Input state changes
        fireEvent.change(name, {target:{value: "Bob"}})
        fireEvent.change(type, {target:{value: "Cachorro"}})
        fireEvent.change(date, {target:{value: "2012-10-10"}})
        fireEvent.click(saveBtn)

        //Verify inputs
        expect(name.value).toBe("Bob")
        expect(type.value).toBe("Cachorro")
        expect(weight.value).toBe("")
        expect(date.value).toBe("2012-10-10")

        const errMsg = screen.getByText("O formulário deve ser preenchido corretamente")
        expect(errMsg).not.toBeNull()
    })

    it('Quando o botão de Salvar é clicado sem preencher o peso', ()=>{
        const history = createMemoryHistory()
        render(<Router history={history}><Create /></Router>)

        //Get inputs
        const name = screen.getByLabelText("Nome")
        const type = screen.getByLabelText("Tipo")
        const weight = screen.getByLabelText("Peso")
        const date = screen.getByLabelText("Data de nascimento")
        const saveBtn = screen.getByText("Salvar")

        //Input state changes
        fireEvent.change(name, {target:{value: "Bob"}})
        fireEvent.change(type, {target:{value: "Cachorro"}})
        fireEvent.change(weight, {target:{value: 10.5}})
        fireEvent.click(saveBtn)

        //Verify inputs
        expect(name.value).toBe("Bob")
        expect(type.value).toBe("Cachorro")
        expect(weight.value).toBe("10.5")
        expect(date.value).toBe("")

        const errMsg = screen.getByText("O formulário deve ser preenchido corretamente")
        expect(errMsg).not.toBeNull()
    })
})