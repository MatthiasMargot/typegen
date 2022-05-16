const prettier = require('prettier')
const { pipe, join, map } = require('ramda')

const spread = require('../utils/spread')
const genType = require('./gen-type')

const genTypes = pipe(
  schemas => Object.entries(schemas).map(entries => [ ...entries, schemas ]),
  map(
    pipe(
      spread(genType),
      type => `export ${type}`
    )
  ),
  join('\n\n')
)

function typescript(swaggerJson) {
  const { components: { schemas } = {} } = swaggerJson

  if (!schemas) {
    return console.log('your schemas property is empty')
  }

  const file = genTypes(schemas)

  const prettified = prettier.format(
    file,
    { parser: 'typescript' }
  )

  return prettified
}

module.exports = typescript
