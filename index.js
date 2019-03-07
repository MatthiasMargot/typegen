const fs = require('fs')
const SwaggerParser = require('swagger-parser')
const prettier = require('prettier')

const toTs = require('./to-ts')

/*
 * TODO: get io paths from command line arguments / api parameters
 * */
SwaggerParser.parse(__dirname + '/swagger-mock.yml').then(
  swaggerJson => {
    const file = toTs(swaggerJson)

    const prettifiedFile = prettier.format(
      file,
      { parser: 'typescript' }
    )

    fs.writeFileSync(__dirname + '/types.ts', prettifiedFile)
  }
)
