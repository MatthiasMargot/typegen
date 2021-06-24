const spread = require('./spread')

describe('spread()', () => {
  it('spreads an array as function arguments to a provided function', () => {
    const mock = jest.fn((a, b) => a + b)

    const wrapped = spread(mock)

    wrapped([ 'foo', 'bar' ])

    expect(mock).toHaveBeenCalledWith('foo', 'bar')
    expect(mock).toReturnWith('foobar')
  })
})
