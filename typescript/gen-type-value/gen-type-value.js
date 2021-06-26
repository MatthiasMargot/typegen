const arrayLast = require('../../utils/array-last')
const genUnion = require('../gen-union')
const genTypeBody = require('../gen-type-body')

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

module.exports = genTypeValue
