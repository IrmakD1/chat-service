jest.mock("express", () => ({
  Router: () => ({
    put: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  }),
}));
jest.mock("../../store", () => ({
    fetchChatData: jest.fn()
}));

const { fetchChatData } = require("../../store");
const conversationRouter = require('./router');

describe("User Router", () => {
  let handler;
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    res = { send: jest.fn(), set: jest.fn() };
    next = jest.fn();
  });

  describe("GET/:id", () => {
    describe("when making a valid request", () => {
      beforeEach(async () => {
        const router = conversationRouter();

        req = { params: { id: 'Bacon' } };
        fetchChatData.mockImplementation(() =>
          Promise.resolve({ Kevin: 'Bacon' })
        );
        [[, handler]] = router.get.mock.calls;
      });

      test('It should return the user document', async () => {
        await handler(req, res, next);
        expect(res.send).toBeCalledWith({ Kevin: 'Bacon' });
      })
    });
    describe("when making an invalid request", () => {
      beforeEach(async () => {
        const router = conversationRouter();

        req = { params: { id: 'Bacon' } };
        fetchChatData.mockImplementation(() =>
          Promise.reject(Error('Whoopsie'))
        );
        [[, handler]] = router.get.mock.calls;

        await handler(req, {}, next);
      });

      test('It should return the user document', async () => {
        expect(next).toBeCalledWith(Error('Whoopsie'));
      })
    });
  });
});
