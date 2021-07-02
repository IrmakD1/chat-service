const Boom = require("@hapi/boom");
const { User, Conversation } = require("./mongo");
const fetchChatData = require("./fetchChatData");

jest.mock("./mongo", () => ({
  User: {
    find: jest.fn(),
  },
  Conversation: {
    find: jest.fn(),
  },
}));

describe("fetchUserData function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns matching user document", async () => {
    User.find.mockImplementationOnce(() => [
      {
        _doc: {
          Kevin: "Bacon",
          __v: "Blah",
        },
      },
    ]);

    expect(await fetchChatData(User,"Bacon")).toEqual({ Kevin: "Bacon" });
  });
  test("returns matching conversation document", async () => {
    Conversation.find.mockImplementationOnce(() => [
      {
        _doc: {
          Kevin: "Bacon",
          __v: "Blah",
        },
      },
    ]);

    expect(await fetchChatData(Conversation, "Bacon")).toEqual({ Kevin: "Bacon" });
  });
  test("returns Boom error if there are duplicate documents", async () => {
    User.find.mockImplementationOnce(() => [
      {
        _doc: {
          Kevin: "Bacon",
          __v: "Blah",
        },
      },
      {
        _doc: {
          Kevin: "Bacon",
          __v: "Blah",
        },
      }
    ]);
    try {
        await fetchChatData(User, "Bacon")
    } catch (err) {
        expect(err.isBoom).toEqual(true)
        expect(err.message).toEqual('Duplicate users found for id Bacon')
    }
  });
  test("returns Boom error if there are no documents", async () => {
    User.find.mockImplementationOnce(() => []);
    try {
        await fetchChatData(User, "Bacon")
    } catch (err) {
        expect(err.isBoom).toEqual(true)
        expect(err.message).toEqual('Not Found')
    }
  });
});
