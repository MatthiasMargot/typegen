const genTypeProperty = require('./gen-type-property')
const genUnion = require('./gen-union')

const arrayHas = require('../utils/array-has')
const arrayLast = require('../utils/array-last')

function genTypeValue (property) {
  if (property.$ref) {
    return arrayLast(property.$ref.split('/'))
  }

  if (property.enum) {
    return genUnion(property.enum)
  }

  if (property.type === 'array') {
    return `${genTypeValue(property.items)}[]`
  }

  if (property.type === 'object') {
    return (
      `{
        ${genTypeBody(property)}
      }`
    )
  }

  return property.type
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

module.exports = genTypeBody
