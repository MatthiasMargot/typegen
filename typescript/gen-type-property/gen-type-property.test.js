const genTypeProperty = require('./gen-type-property')

const typeKey = 'key'
const propertyValue = 'value'

describe('genUnion()', () => {
  it('generates a typescript property', () => {
    const isRequired = true

    const result = genTypeProperty(
      'key',
      isRequired,
      'string',
    )

    const expected = `'key': string;`

    expect(result).toEqual(expected)
  })

  it('generates an optional typescript property', () => {
    const isRequired = false

    const result = genTypeProperty(
      'key',
      isRequired,
      'string',
    )

    const expected = `'key'?: string;`

    expect(result).toEqual(expected)
  })

  it('aliases types with different names in swagger than in ts', () => {
    const isRequired = true

    const result = genTypeProperty(
      'key',
      isRequired,
      'integer',
    )

    const expected = `'key': number;`

    expect(result).toEqual(expected)
  })
})
