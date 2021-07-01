const logger = require('./logger');

const mockBoomError = {
  isBoom: true,
  isServer: false,
  output: {
    payload: {
      statusCode: 400,
      error: 'Kevin Bacon caused an error'
    }
  },
  stack: {
    Kevin: 'Bacon'
  }
}

const mockServerError = {
  isBoom: false,
  isServer: true,
  output: {
    payload: {
      statusCode: 500,
      error: 'Kevin Bacon caused an error'
    }
  },
  stack: {
    Kevin: 'Bacon'
  }
}

describe('logger module', () => {
  test('returns a logger', () => {
    expect(logger.level).toBe('info');
  });
  test('returns an Boom error message', () => {
    expect(logger.error('blah', mockBoomError)).toBeTruthy()
  })
  test('returns an server error message', () => {
    expect(logger.error('blah', mockServerError)).toBeTruthy()
  })
});
