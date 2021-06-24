const prettier = require('prettier')
const { pipe, join, map } = require('ramda')

const spread = require('../utils/spread')
const genType = require('./gen-type')

const genTypes = pipe(
  Object.entries,
  map(
    pipe(
      spread(genType),
      type => `export ${type}`
    )
  ),
  join('\n\n')
)

function typescript (swaggerJson) {
  const { components: { schemas } } = swaggerJson

  const file = genTypes(schemas)

  const prettified = prettier.format(
    file,
    { parser: 'typescript' }
  )

  return prettified
}

module.exports = typescript
