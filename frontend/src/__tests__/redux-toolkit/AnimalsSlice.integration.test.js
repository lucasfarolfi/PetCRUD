import {httpDelete, httpGet, httpPut, httpPost, httpGetOne} from '../../api/AnimalsHttpRequest'
import { configureStore } from '@reduxjs/toolkit'
import animalsReducer, { deleteAnimal, fetchAnimals, getAnimal, saveAnimal, updateAnimal } from '../../redux-toolkit/animals/animalsSlice'

jest.mock("../../api/AnimalsHttpRequest", () => ({
    httpGet: jest.fn(),
    httpGetOne: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}))

describe("Animals Slice redux integration tests", () =>{
    let store;

    beforeEach(() => {
        store = configureStore({reducer: { animals: animalsReducer }});
    });

    afterEach(() => {
        httpGet.mockClear();
        httpGetOne.mockClear();
        httpPost.mockClear();
        httpPut.mockClear();
        httpDelete.mockClear();
    });

    //HttpGet
    it('Must return a list of animals, when calls HttpGet', async () => {
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

    it('Must return error status, when calls HttpGet and an error occurs', async () => {
        //Mocka a função Get e simula o retorno de uma mensagem de erro
        httpGet.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o array de animais
        await store.dispatch(fetchAnimals());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Must return loading status, when calls HttpGet', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpGet.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(fetchAnimals());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpGetOne
    it('Must return an animal, when calls HttpGetOne', async () =>{
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
        expect(store.getState().animals.entities["1"]).toBe(animalGet)
    })

    it('Must return error status, when calls HttpGetOne and an error occurs', async () => {
        //Mocka a função Get e simula o retorno de uma mensagem de erro
        httpGetOne.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o animal a ser atualizado
        await store.dispatch(getAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Must return loading status, when calls HttpGetOne', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpGetOne.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(getAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpPost
    it('Must return a created animal, when calls HttpPost', async () =>{
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

    it('Must return error status, when calls HttpPost and an error occurs', async () => {
        //Mocka a função Get e simula o retorno de uma mensagem de erro
        httpPost.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o animal a ser atualizado
        await store.dispatch(saveAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Must return loading status, when calls HttpPost', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpPost.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(saveAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpPut
    it('Must return an updated animal, when calls HttpPut', async () =>{
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

    it('Must return error status, when calls HttpPut and an error occurs', async () => {
        //Mocka a função Put e simula um retorno de erro de promise
        httpPut.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para carregar o animal a ser atualizado
        await store.dispatch(updateAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Must return loading status, when calls HttpPut', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpPut.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(updateAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })

    //HttpDelete
    it("Must delete an animal, when calls HttpDelete", async () =>{
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

    it('Must return error status, when calls HttpDelete and an error occurs', async () => {
        //Mocka a função Delete e simula o retorno de um erro
        httpDelete.mockImplementation(() => Promise.reject({}));
        
        //Chama o dispatch para atualizar o animal a ser atualizado
        await store.dispatch(deleteAnimal());

        //O status do slice é retornado como falho
        expect(store.getState().animals.status).toBe('failed');
    })

    it('Must return loading status, when calls HttpDelete', async () => {
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        
        httpDelete.mockImplementation(() => wait(1000))

        //Chama o dispatch para carregar os objetos de animais
        store.dispatch(deleteAnimal());

        //O status do slice é retornado como carregando
        expect(store.getState().animals.status).toBe('loading');
    })
})