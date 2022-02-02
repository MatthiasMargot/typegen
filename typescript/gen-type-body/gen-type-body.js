const { join, pipe, map } = require('ramda')

const genTypeProperty = require('../gen-type-property/gen-type-property')
const genUnion = require('../gen-union/gen-union')
const arrayHas = require('../../utils/array-has')
const arrayLast = require('../../utils/array-last')
const entries = require('../../utils/entries')
const typeAliases = require('../../type-aliases')

function genTypeValue (property) {
  const { $ref, items, type } = property

  if ($ref) {
    return arrayLast($ref.split('/'))
  }

  if (property.enum) {
    return genUnion(property.enum)
  }

  if (type === 'array') {
    return `${genTypeValue(items)}[]`
  }

  if (type === 'object') {
    if (property.allOf) {
      return join('&')(
        map(genTypeValue)(
          property.allOf
        )
      )
    }

    return `{ ${genTypeBody(property)} }`
  }

  return typeAliases.ts[type] ? typeAliases.ts[type] : type
}

const genTypeBody = pipe(
  ({ properties = {}, required }) =>
    entries(properties).map(
      ([ key, property ]) => genTypeProperty(
        key,
        required && arrayHas(required, key),
        genTypeValue(property),
        property.description
      )
    ),
  join('')
)

module.exports = genTypeBody
