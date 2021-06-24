const fs = require('fs')
const { program } = require('commander')

const typescript = require('./typescript')

/*
 * TODO: Restore yaml support
 *
 * const SwaggerParser = require('swagger-parser')
 */

function typegen (pathToSource, pathToDestination = './swagger-typegen.ts') {
  const source = fs.readFileSync(pathToSource, { encoding: 'utf-8' })

  const json = JSON.parse(source)

  const output = typescript(json)

  fs.writeFileSync(pathToDestination, output)
}

program
  .arguments('<pathToSource> [pathToDestination]')
  .action(typegen)

program.parse(process.argv)
