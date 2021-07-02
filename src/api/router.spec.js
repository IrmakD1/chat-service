jest.mock('express', () => ({
    Router: jest.fn(() => ({
      use: jest.fn(),
    })),
  }));
  
  jest.mock('./users', () => (userRouter = jest.fn()));
  jest.mock('./conversations', () => (conversationRouter = jest.fn()));
  
  const router = require('./router');
  
  describe('router', () => {
    let result;
    beforeEach(() => {
      result = router();
    });
  
    test('should return router object', () => {
      expect(typeof result).toBe('object');
      expect(result.use).toBeDefined();
    });
  
    test('should call router.use for user', () => {
      expect(result.use).toHaveBeenCalled();
      expect(result.use.mock.calls[0][0]).toBe('/user');
    });
    test('should call router.use for conversation', () => {
      expect(result.use).toHaveBeenCalled();
      expect(result.use.mock.calls[1][0]).toBe('/conversation');
    });
  });
  