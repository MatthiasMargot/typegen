const genEnumBody = require('./gen-enum-body')

const removeWhitespace = require('../utils/remove-whitespace')

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
      baz = 'baz',
    `

    expect(removeWhitespace(result)).toEqual(removeWhitespace(expected))
  })
})
