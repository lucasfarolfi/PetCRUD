import { httpDelete, httpGet, httpGetOne, httpPost, httpPut } from "../../api/AnimalsHttpRequest";
import MockAdapter from "axios-mock-adapter"
import axios from "axios";

describe("Animals Http Request integration tests", async () => {
    let mock = null;

    beforeEach(() => {
        mock = new MockAdapter(axios)
    });

    afterEach(() => {
        mock.restore()
    });

    //HttpGet
    test('Must retrieve a list of animals, when HttpGet function is called', async () => {
        const payload = [{
            id: 1,
            name: "totó",
            type: "cachorro",
            date: '2020-10-23',
            weight: 10.0
        }];

        mock.onGet("/animais").reply(200, payload);

        expect(await httpGet()).toEqual(payload)
    })

    test('Must throw an error, when HttpGet request failed', async () => {
        const data = { message: "Request error", code: 500 };

        mock.onGet("/animais").reply(404, data);

        httpGet().catch(error => {
            expect(error.response.data).toEqual(data)
        })
    })


    //HttpGetOne
    test('Must retrieve an animal, when HttpGetOne function is called', async () => {
        const payload = {
            id: 1,
            name: "totó",
            type: "cachorro",
            date: '2020-10-23',
            weight: 10.0
        };

        mock.onGet("/animais/" + payload.id).reply(200, payload);

        expect(await httpGetOne(payload.id)).toEqual(payload)
    })

    test('Must throw an error, when HttpGetOne request failed', async () => {
        const data = { message: "not found", code: 404 };
        const id = 1;

        mock.onGet("/animais/" + id).reply(404, data);

        httpGetOne(id).catch(error => {
            expect(error.response.data).toEqual(data)
        })
    })


    //HttpPost
    test('Must update an animal, when HttpPut function is called', async () => {
        const payload = {
            id: 1,
            name: "totó",
            type: "cachorro",
            date: '2020-10-23',
            weight: 10.0
        };

        mock.onPost("/animais").reply(200, payload);

        expect(await httpPost(payload.id)).toEqual(payload)
    })

    test('Must throw an error, when HttpPut request failed', async () => {
        const data = { message: "Request error", code: 400 };
        const id = 1;

        mock.onPost("/animais").reply(400, data);

        httpPost(id).catch(error => {
            expect(error.response.data).toEqual(data)
        })
    })


    //HttpDelete
    test('Must delete an animal, when HttpDelete function is called', async () => {
        const payload = {};
        const id = 1;

        mock.onDelete("/animais/" + id).reply(204, payload);

        expect(await httpDelete(id)).toEqual(payload)
    })

    test('Must throw an error, when HttpDelete request failed', async () => {
        const data = { message: "not found", code: 404 };
        const id = 1;

        mock.onDelete("/animais/" + id).reply(404, data);

        httpDelete(id).catch(error => {
            expect(error.response.data).toEqual(data)
        })
    })


    //HttpPut
    test('Must update an animal, when HttpPut function is called', async () => {
        const payload = {
            id: 1,
            name: "totó",
            type: "cachorro",
            date: '2020-10-23',
            weight: 10.0
        };

        mock.onPut("/animais/" + payload.id).reply(200, payload);

        expect(await httpPut(payload.id)).toEqual(payload)
    })

    test('Must throw an error, when HttpPut request failed', async () => {
        const data = { message: "not found", code: 404 };
        const id = 1;

        mock.onPut("/animais/" + id).reply(404, data);

        httpPut(id).catch(error => {
            expect(error.response.data).toEqual(data)
        })
    })
})