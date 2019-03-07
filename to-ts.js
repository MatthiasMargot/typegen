const genType = require('./ts/gen-type')

function toTs (swaggerJson) {
  const { definitions } = swaggerJson

  const genTypeString = (concatenation, typeName) => {
    const definition = definitions[typeName]

    const type = genType(typeName, definition)

    return (
      concatenation
      + 'export'
      + ' '
      + type
      + '\n'
      + '\n'
    )
  }

  const definitionKeys = Object.keys(definitions)

  const file = definitionKeys.reduce(genTypeString, '')

  return file
}

module.exports = toTs
