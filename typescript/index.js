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

function typescript(swaggerJson) {
  if (!swaggerJson.components || (swaggerJson.components && !swaggerJson.components.schemas)) {
    return console.log('ERROR: schemas property is not available')
  }
  
  const file = genTypes(swaggerJson.components.schemas)

  const prettified = prettier.format(
    file,
    { parser: 'typescript' }
  )

  return prettified
}

module.exports = typescript
