const arrayLast = require('./array-last')

describe('arrayLast()', () => {
  it('returns the last element of a given array', () => {
    const array = [ 'foo', 'bar' ]

    const result = arrayLast(array)

    expect(result).toEqual('bar')
  })
})
