import convertDate from "../../utils/convertDate";

describe("ConvertDate util function unit tests", async () => {

    test('Must convert date correctly', async () => {
        expect(convertDate('2022-10-23')).toEqual("23/10/2022")
    })
})