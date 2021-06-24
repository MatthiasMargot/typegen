const genEnumBody = require('./gen-enum-body')

const trimAll = require('../utils/trim-all')

describe('genEnumBody()', () => {
  it('generates a typescript enum\'s body given a swagger definition enum', () => {
    const swaggerEnum = {
      enum: [
        'foo',
        'bar',
        'baz',
      ]
    }

    const result = genEnumBody(swaggerEnum)

    const expected = `
      foo = 'foo',
      bar = 'bar',
      baz = 'baz'
    `

    expect(trimAll(result)).toEqual(trimAll(expected))
  })
})
