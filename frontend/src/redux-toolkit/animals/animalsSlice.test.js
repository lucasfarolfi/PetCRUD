import {httpDelete, httpGet, httpPut, httpPost, httpGetOne} from '../../utils/animals'
import { configureStore } from '@reduxjs/toolkit'
import animalsReducer, { deleteAnimal, fetchAnimals, getAnimal, saveAnimal, updateAnimal } from './animalsSlice'

jest.mock("../../utils/animals", () => ({
    httpGet: jest.fn(),
    httpGetOne: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}))

let store;

describe("Redux Slice", () =>{
    beforeEach(() => {
        store = configureStore({reducer: { animals: animalsReducer }});
    });

    afterEach(() => {
        httpGet.mockClear();
        httpPost.mockClear();
        httpPut.mockClear();
        httpDelete.mockClear();
    });

    //HttpGet
    it('Quando retorna sucesso na operação httpGet', async () => {
        //Mocka a função Get e simula o retorno de um array de objetos
        httpGet.mockImplementation(() => Promise.resolve([
            {
                id: "1",
                name: "totó",
                type: "cachorro",
                date: '2020-10-23',
                weight: 10.0
            }
        ]));
        
        //Chama o dispatch para atualizar o array de animais
        await store.dispatch(fetchAnimals());

        //O status do slice é retornado como ready
        expect(store.getState().animals.status).toBe('ready');

        //É esperado receber este objeto no array de animais
        expect(store.getState().animals.entities['1']).toEqual(
            {
                id: "1",
                name: "totó",
                type: "cachorro",
                date: '2020-10-23',
                weight: 10.0
            }
        )
    })

    it('Quando retorna erro na operação httpGet', async () => {
        //Mocka a função Get e simula o retorno de uma mensagem de erro
        httpGet.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o array de animais
        await store.dispatch(fetchAnimals());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Quando retorna carregando na operação httpGet', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpGet.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(fetchAnimals());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpGetOne
    it('Quando retorna sucesso na operação httpGetOne', async () =>{
        const animalGet = {
            id: "1",
            name: "totó",
            type: "cachorro",
            date: '2000-10-05',
            weight: 10.0
        }

        httpGetOne.mockImplementation(() => Promise.resolve(animalGet))

        await store.dispatch(getAnimal('1'))
        expect(store.getState().animals.status).toBe('ready')
        expect(store.getState().animals.entities["1"]).toBe(undefined) //Consertar
    })

    it('Quando retorna erro na operação httpGetOne', async () => {
        //Mocka a função Get e simula o retorno de uma mensagem de erro
        httpGetOne.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o animal a ser atualizado
        await store.dispatch(getAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Quando retorna carregando na operação httpGet', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpGetOne.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(getAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpPost
    it('Quando retorna sucesso na operação httpPost', async () =>{
        const animal = {
            name: "totó",
            type: "cachorro",
            date: '2020-01-15',
            weight: 10.0
        }

        httpPost.mockImplementation(() => Promise.resolve(
            {...animal, id: "1"}
        ))

        await store.dispatch(saveAnimal(animal))
        expect(store.getState().animals.status).toBe('ready')
        expect(store.getState().animals.entities["1"]).toEqual({...animal, id: "1"})
    })

    it('Quando retorna erro na operação httpPost', async () => {
        //Mocka a função Get e simula o retorno de uma mensagem de erro
        httpPost.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o animal a ser atualizado
        await store.dispatch(saveAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Quando retorna carregando na operação httpPost', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpPost.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(saveAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpPut
    it('Quando retorna sucesso na operação HttpPut', async () =>{
        //Objeto do animal
        const updatedAnimal = {
            id: "1",
            name: "Totó",
            type: "Cachorro",
            date: "2020-05-10",
            weight: 10.5
        }

        //Implementação do mock do método de update
        httpPut.mockImplementation(() => Promise.resolve(updatedAnimal))
        await store.dispatch(updateAnimal(updatedAnimal))
        expect(store.getState().animals.status).toBe('ready')
        expect(store.getState().animals.entities["1"]).toEqual({...updatedAnimal})
    })

    it('Quando retorna erro na operação httpPut', async () => {
        //Mocka a função Put e simula um retorno de erro de promise
        httpPut.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para carregar o animal a ser atualizado
        await store.dispatch(updateAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Quando retorna carregando na operação httpPut', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpPut.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(updateAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpDelete
    it("Quando retorna sucesso na operação HttpDelete", async () =>{
        const deletedAnimal = {
            id: "1",
            name: "Totó",
            type: "Cachorro",
            date: "2020-05-10",
            weight: 10.5
        }
        
        httpDelete.mockImplementation(() => Promise.resolve(deletedAnimal))
        await store.dispatch(deleteAnimal(1))
        expect(store.getState().animals.status).toBe("ready")
        expect(store.getState().animals.ids.length).toBe(0)
    })

    it('Quando retorna erro na operação httpDelete', async () => {
        //Mocka a função Delete e simula o retorno de um erro
        httpDelete.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o animal a ser atualizado
        await store.dispatch(deleteAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Quando retorna carregando na operação httpDelete', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpDelete.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(deleteAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })
})