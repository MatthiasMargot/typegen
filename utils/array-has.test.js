const arrayHas = require('./array-has')

describe('arrayHas()', () => {
  it('returns true given an item contained in a given array', () => {
    const array = [ 'foo', 'bar' ]

    const item = 'foo'

    const result = arrayHas(array, item)

    expect(result).toEqual(true)
  })

  it('returns false given an item not contained in a given array', () => {
    const array = [ 'foo', 'bar' ]

    const item = 'baz'

    const result = arrayHas(array, item)

    expect(result).toEqual(false)
  })
})
