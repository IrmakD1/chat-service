const serverStatus = require('./server-status')
const mockDate = require('mockdate')
const { before } = require('lodash')

mockDate.set('2021-06-29T17:19:50.927Z')

const started = new Date()

describe('serverStatus', () => {
    let middleware
    let resMock
    let nextMock

    beforeEach(() => {
        resMock = { send: jest.fn() }
        nextMock = jest.fn()
        middleware = serverStatus(started)
    })

    afterEach(() => jest.clearAllMocks())

    describe('when the request is at the root', () => {
        beforeEach(async () => {
            Date.now = jest.fn().mockReturnValue(started.getTime() + 1000);
            await middleware({ path: '/' }, resMock, nextMock);
        })
        test('it should return server name, start time and uptime', () => {
            expect(resMock.send.mock.calls[0][0].started).toBe(started);
            expect(resMock.send.mock.calls[0][0].name).toBe('chat-service');
            expect(resMock.send.mock.calls[0][0].uptime).toBe((Date.now() - started.getTime()) / 1000);
        })
    })
    describe('when the request is not at the root level', () => {
        beforeEach(async () => {
            await middleware({ path: '/Kevin' }, resMock, nextMock);
        })
        test('Next should be called', () => {
            expect(nextMock).toBeCalled()
        })
    })
})