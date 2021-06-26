const { join, pipe } = require('ramda')

const arrayHas = require('../../utils/array-has')
const entries = require('../../utils/entries')
const arrayLast = require('../../utils/array-last')
const genTypeProperty = require('../gen-property')
const genUnion = require('../gen-union')

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

module.exports.genTypeValue = genTypeValue

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

module.exports.genTypeBody = genTypeBody
