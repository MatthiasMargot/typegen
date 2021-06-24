const trimAll = require('./trim-all')

describe('trimAll()', () => {
  it('removes any whitespace from a string', () => {
    const stringWithLotsOfWhitespace = `

      TONS OF WHITESPACE
    
    `
    + ' '
    + 'SOME MORE WHITESPACE'

    const result = trimAll(stringWithLotsOfWhitespace)

    expect(result).toEqual('TONSOFWHITESPACESOMEMOREWHITESPACE')
  })
})
