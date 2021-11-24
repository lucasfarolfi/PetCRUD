import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {Router, MemoryRouter, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { selectAnimalsById, updateAnimal } from '../redux-toolkit/animals/animalsSlice'
import Update from '../pages/Update/index'
import {useDispatch, useSelector} from 'react-redux'

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
    getAnimal: jest.fn(),
    updateAnimal: jest.fn(),
    selectAnimalsById: jest.fn()
}))

describe('Formulário de Atualizar animal', () =>{
    beforeEach(() => {
        useSelector.mockImplementation(cb => cb(mockState))
        useDispatch.mockImplementation(() => jest.fn(param => param))//Erro ao carregar o animal na base de dados
        selectAnimalsById.mockImplementation(() =>{
            mockState.animals.status = 'ready'
        })
    })

    it('O formulário é renderizado com as informações preenchidas ao entrar na página', ()=>{
        const idParam = "2";
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()

        render(
            <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
            </MemoryRouter>
        )
        expect(screen.getByText("Atualizar Animal").textContent).toBe("Atualizar Animal")

        //Verify Labels
        expect(screen.getByText("Nome")).not.toBeNull()
        expect(screen.getByText("Tipo")).not.toBeNull()
        expect(screen.getByText("Peso")).not.toBeNull()
        expect(screen.getByText("Data de nascimento")).not.toBeNull()

        //Inputs
        const name = screen.getByLabelText("Nome")
        const type = screen.getByLabelText("Tipo")
        const weight = screen.getByLabelText("Peso")
        const date = screen.getByLabelText("Data de nascimento")

        //Verify inputs
        expect(name).not.toBeNull()
        expect(type).not.toBeNull()
        expect(weight).not.toBeNull()
        expect(date).not.toBeNull()

        //Verify inputs values
        expect(name.value).not.toBeNull()
        expect(type.value).not.toBeNull()
        expect(weight.value).not.toBeNull()
        expect(date.value).not.toBeNull()

        expect(screen.getByText("Salvar")).not.toBeNull()
        expect(screen.getByText("Cancelar")).not.toBeNull()
    })

    it('O botão de Cancelar funciona corretamente', ()=>{
        const idParam = "2";
        const history = createMemoryHistory()
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()

        render(
            <Router history={history}>
                <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
                </MemoryRouter>
            </Router>
        )
        const cancelBtn = screen.getByText("Cancelar")
        fireEvent.click(cancelBtn)
        expect(history.location.pathname).toBe("/")
    })

    it('Quando o formulário é preenchido e enviado corretamente', ()=>{
        const animal = {
            id: "2",
            name: "Nina",
            type: "Gato",
            weight: "10.5",
            date: "2020-01-10"
        }

        const findId = mockState.animals.entities.find(a => a.id === animal.id)
        expect(findId).not.toBeNull()

        render(
            <MemoryRouter initialEntries={['/animal/'+animal.id+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
            </MemoryRouter>
        )

        //Inputs
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
        fireEvent.click(saveBtn)
        
        expect(updateAnimal).toHaveBeenCalledTimes(1)
    })

    it('O formulário é preenchido sem um animal existente', ()=>{
        selectAnimalsById.mockImplementation(() =>{
            mockState.animals.status = 'failed'
        })

        const animal = {
            id: "4",
            name: "Nina",
            type: "Gato",
            weight: "10.5",
            date: "2020-01-10"
        }
        
        const findId = mockState.animals.entities.find(a => a.id === animal.id)
        expect(findId).toBe(undefined)

        render(
            <MemoryRouter initialEntries={['/animal/'+animal.id+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
            </MemoryRouter>
        )

        //Verify Labels
        expect(screen.getByText("Nome")).not.toBeNull()
        expect(screen.getByText("Tipo")).not.toBeNull()
        expect(screen.getByText("Peso")).not.toBeNull()
        expect(screen.getByText("Data de nascimento")).not.toBeNull()

        //Inputs
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
        fireEvent.click(saveBtn)
        
        expect(updateAnimal).toHaveBeenCalledTimes(0)
        expect(screen.getByText("Erro ao carregar o animal na base de dados")).not.toBeNull()
    })

    it('Quando o botão de Salvar é clicado sem preencher nenhum input', ()=>{
        const idParam = "2";
        const history = createMemoryHistory()
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()

        render(
            <Router history={history}>
                <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
                </MemoryRouter>
            </Router>
        )

        const saveBtn = screen.getByText("Salvar")
        fireEvent.click(saveBtn)

        const errMsg = screen.getByText("O formulário deve ser preenchido corretamente")
        expect(errMsg).not.toBeNull()
    })

    it('Quando o botão de Salvar é clicado sem preencher o nome', ()=>{
        const idParam = "2";
        const history = createMemoryHistory()
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()

        render(
            <Router history={history}>
                <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
                </MemoryRouter>
            </Router>
        )

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
        const idParam = "2";
        const history = createMemoryHistory()
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()

        render(
            <Router history={history}>
                <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
                </MemoryRouter>
            </Router>
        )

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
        const idParam = "2";
        const history = createMemoryHistory()
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()
        
        render(
            <Router history={history}>
                <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
                </MemoryRouter>
            </Router>
        )

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

    it('Quando o botão de Salvar é clicado sem preencher a data de nascimento', ()=>{
        const idParam = "2";
        const history = createMemoryHistory()
        const findId = mockState.animals.entities.find(a => a.id === idParam)
        expect(findId).not.toBeNull()

        render(
            <Router history={history}>
                <MemoryRouter initialEntries={['/animal/'+idParam+'/editar']}>
                <Route path="/animal/:id/editar">
                    <Update />
                </Route>
                </MemoryRouter>
            </Router>
        )

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