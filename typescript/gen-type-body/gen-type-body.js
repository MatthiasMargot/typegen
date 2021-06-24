const { join, pipe } = require('ramda')

const genTypeProperty = require('../gen-type-property/gen-type-property')
const genUnion = require('../gen-union/gen-union')
const arrayHas = require('../../utils/array-has')
const arrayLast = require('../../utils/array-last')
const entries = require('../../utils/entries')

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

const genTypeBody = pipe(
  ({ properties = {}, required }) =>
    entries(properties).map(
      ([ key, property ]) => genTypeProperty(
        key,
        required && arrayHas(required, key),
        genTypeValue(property)
      )
    ),
  join('')
)

module.exports = genTypeBody
