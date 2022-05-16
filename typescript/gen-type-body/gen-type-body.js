const { join, pipe, map } = require('ramda')

const genTypeProperty = require('../gen-type-property/gen-type-property')
const genUnion = require('../gen-union/gen-union')
const arrayHas = require('../../utils/array-has')
const arrayLast = require('../../utils/array-last')
const entries = require('../../utils/entries')
const typeAliases = require('../../type-aliases')

function genTypeValue (property, schemas) {
  const { $ref, items, type } = property

  if ($ref) {
    const refName = arrayLast($ref.split('/'))

    return schemas[refName].title || refName
  }

  if (property.enum) {
    return genUnion(property.enum)
  }

  if (type === 'array') {
    return `${genTypeValue(items, schemas)}[]`
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
  ({ properties = {}, required }, schemas) => entries(properties).map(
    ([ key, property ]) => genTypeProperty(
      key,
      required && arrayHas(required, key),
      genTypeValue(property, schemas),
      property.description
    )
  ),
  join('')
)

module.exports = genTypeBody
