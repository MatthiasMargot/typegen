const genUnion = require('./gen-union')

describe('genUnion()', () => {
  it('generates a typescript union given a swagger union array', () => {
    const swaggerUnion = [
      'foo',
      'bar',
      'baz',
    ]

    const result = genUnion(swaggerUnion)

    const expected = `'foo' | 'bar' | 'baz'`

    expect(result).toEqual(expected)
  })
})
