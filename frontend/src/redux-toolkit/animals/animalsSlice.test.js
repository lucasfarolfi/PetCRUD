import {httpDelete, httpGet, httpPut, httpPost, httpGetOne} from '../../utils/animals'
import { configureStore } from '@reduxjs/toolkit'
import animalsReducer, { fetchAnimals, getAnimal, saveAnimal } from './animalsSlice'

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
    it('Quando o dispatch retorna sucesso na operação httpGet', async () => {
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

    //HttpGetOne
    it('Quando o dispatch retorna sucesso na operação httpGetOne', async () =>{
        httpGetOne.mockImplementation(() => Promise.resolve(
            {
                id: "1",
                name: "totó",
                type: "cachorro",
                date: '2000-10-05',
                weight: 10.0
            }
        ))

        await store.dispatch(getAnimal('1'))
        expect(store.getState().animals.status).toBe('ready')
    })

    //HttpPost
    it('Quando o dispatch retorna sucesso na operação httpPost', async () =>{
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

    it('Quando o dispatch retorna sucesso na operação HttpPut', () =>{
        
    })
})