const removeWhitespace = require('./remove-whitespace')

describe('removeWhitespace()', () => {
  it('removes any whitespace from a string', () => {
    const stringWithLotsOfWhitespace = `

      TONS OF WHITESPACE
    
    `
    + ' '
    + 'SOME MORE WHITESPACE'

    const result = removeWhitespace(stringWithLotsOfWhitespace)

    expect(result).toEqual('TONSOFWHITESPACESOMEMOREWHITESPACE')
  })
})
