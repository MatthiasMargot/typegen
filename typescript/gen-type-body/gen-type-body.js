const { join, pipe } = require('ramda')

const arrayHas = require('../../utils/array-has')
const entries = require('../../utils/entries')
const genTypeProperty = require('../gen-property')
const genTypeValue = require('../gen-type-value')

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
