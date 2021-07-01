const loggerFormat = require('./logger')

const mockTokens = {
    method: jest.fn(),
    url: jest.fn(),
    status: jest.fn(),
    res: jest.fn(),
}

const mockReq = {
    Kevin: 'Bacon'
}

const mockRes = {
    Bacon: "Kevin"
}


describe('loggerFormat', () => {
    beforeEach(() => jest.clearAllMocks());
    test('it should not return if url includes service worker', () => {
        mockTokens.url.mockImplementationOnce(() => 'service-worker')
        expect(loggerFormat(mockTokens, mockReq, mockRes)).toBeFalsy()
    })
    test('it should return request information', () => {

        mockTokens["response-time"] = jest.fn(() => '100')

        mockTokens.method.mockImplementationOnce(() => 'GET')
        mockTokens.url.mockImplementationOnce(() => 'Kevin')
        mockTokens.status.mockImplementationOnce(() => '200')
        mockTokens.res.mockImplementationOnce(() => 'Bacon')
        expect(loggerFormat(mockTokens, mockReq, mockRes)).toBe("_____________ Method: GET; Url: undefined; Status code: 200; Bacon - 100 ms _____________")
    })
})