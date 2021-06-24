const { pipe, prop, map, join } = require('ramda')

const genEnumBody = pipe(
  prop('enum'),
  map(entry => `${entry} = '${entry}'`),
  join(',')
)

module.exports = genEnumBody
