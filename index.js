const fs = require('fs')
const SwaggerParser = require('swagger-parser')
const prettier = require('prettier')

const arrayHas = require('./utils/array-has')
const arrayLast = require('./utils/array-last')

const typemap = {
  integer: 'number',
}

function genTypeValue (property) {
  if (property.$ref) {
    return arrayLast(property.$ref.split('/'))
  }

  if (property.enum) {
    return genUnion(property.enum)
  }

  if (property.type === 'array') {
    return `${genTypeValue(property.items)} []`
  }

  if (property.type === 'object') {
    return (
      '{'
      + genTypeBody(property)
      + '}'
    )
  }

  return property.type
}

function genTypeProperty (typeKey, required, value) {
  const requiredSymbol = required ? '?' : ''

  const typeValue =
    typemap[value]
      ? typemap[value]
      : value

  return (
    typeKey
    + requiredSymbol
    + ':'
    + ' '
    + typeValue
    + ';'
  )
}

function genUnion (unionArray) {
  return unionArray.map(item => `'${item}'`).join(' | ')
}

function genEnumBody (definition) {
  return definition.enum.reduce(
    (concatenation, enumEntry) => {
      return (
        concatenation
        + enumEntry
        + ' '
        + '='
        + ' '
        + `'${enumEntry}'`
        + ','
      )
    },
    '',
  )
}

function genTypeBody (definition) {
  const { properties, required } = definition

  const propertyKeys = Object.keys(properties)

  return propertyKeys.reduce(
    (concatenation, propertyKey) => {
      const property = properties[propertyKey]

      const isRequired = required && arrayHas(required, propertyKey)

      return concatenation + genTypeProperty(
        propertyKey,
        isRequired,
        genTypeValue(property),
      )
    },
    '',
  )
}

function fitsTsInterface (definition) {
  return true
}

function genType (typeName, typeDefinition) {
  if (typeDefinition.enum) {
    const enumBody = genEnumBody(typeDefinition)

    return (
      'enum'
      + ' '
      + typeName
      + ' '
      + '{'
      + enumBody
      + '}'
    )
  }

  const typeKeyWord =
    fitsTsInterface(typeDefinition)
      ? 'interface'
      : 'type'

  const typeBody = genTypeBody(typeDefinition)

  return (
    typeKeyWord
    + ' '
    + typeName
    + ' '
    + '{'
    + typeBody
    + '}'
  )
}

function toTsFile (swaggerJson) {
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

/*
 * TODO: get io paths from command line arguments / api parameters
 * */
SwaggerParser.parse(__dirname + '/swagger-mock.yml').then(
  swaggerJson => {
    const file = toTsFile(swaggerJson)

    const prettifiedFile = prettier.format(
      file,
      { parser: 'typescript' }
    )

    fs.writeFileSync(__dirname + '/types.ts', prettifiedFile)
  }
)
